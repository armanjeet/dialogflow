import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../services/agent.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css'],
})
export class CreateAgentComponent implements OnInit {
  steps = [
    { title: 'Agent Info', description: 'Provide agent details.' },
    { title: 'Import Knowledge', description: 'Enter knowledge base URL.' },
    { title: 'Talk to Your Agent', description: 'Configure conversation settings.' },
  ];
  activeStep = 0;
  completedSteps = [false, false, false]; // Tracks which steps are completed
  currentForm!: FormGroup; // Dynamic form based on the active step

  languages: any[] = [];
  timeZones: any[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loadDropdownData(); // Load dropdown data on initialization
    this.setupForm(); // Initialize the dynamic form
    this.prefillFormFromSession(); // Prefill form data from session storage
  }

  setupForm() {
    if (this.activeStep === 0) {
      this.currentForm = this.fb.group({
        displayName: [this.getFromSession('displayName') || '', [Validators.required]],
        defaultLanguageCode: [this.getFromSession('defaultLanguageCode') || '', [Validators.required]],
      });
    } else if (this.activeStep === 1) {
      this.currentForm = this.fb.group({
        knowledgeUrl: [this.getFromSession('knowledgeUrl') || '', [Validators.required]],
      });
    } else if (this.activeStep === 2) {
      this.currentForm = this.fb.group({
        timeZone: [this.getFromSession('timeZone') || '', [Validators.required]], // Ensure this is an 'id' or 'id' string
        avatarUri: [this.getFromSession('avatarUri') || '', [Validators.required]],
        description: [this.getFromSession('description') || '', [Validators.required]],
      });
    }
  }

  private loadDropdownData(): void {
    this.agentService.getDefaultLanguages().subscribe(
      (response: any[]) => (this.languages = response),
      (error) => console.error('Error fetching languages:', error)
    );

    this.agentService.getTimeZones().subscribe(
      (response: any[]) => (this.timeZones = response),
      (error) => console.error('Error fetching time zones:', error)
    );
  }

  prefillFormFromSession(): void {
    const sessionData = JSON.parse(sessionStorage.getItem('createAgentData') || '{}');
    if (sessionData) {
      Object.keys(sessionData).forEach((key) => {
        if (this.currentForm && this.currentForm.controls[key]) {
          this.currentForm.controls[key].setValue(sessionData[key]);
        }
      });
    }
  }

  saveToSession(): void {
    const sessionData = JSON.parse(sessionStorage.getItem('createAgentData') || '{}');
    const updatedData = { ...sessionData, ...this.currentForm.value };
    sessionStorage.setItem('createAgentData', JSON.stringify(updatedData));
  }

  getFromSession(key: string): any {
    const sessionData = JSON.parse(sessionStorage.getItem('createAgentData') || '{}');
    return sessionData[key];
  }

  onNext(): void {
    if (this.currentForm.valid) {
      this.saveToSession(); // Save current form data to session storage
      this.completedSteps[this.activeStep] = true; // Mark the current step as completed
      if (this.activeStep < this.steps.length - 1) {
        this.activeStep++; // Move to the next step
        this.setupForm(); // Update form for the new step
      } else {
        this.onSubmit(); // Submit the form if it's the last step
      }
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  }

  onSubmit() {
    if (this.currentForm.invalid) {
      this.currentForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
    }

    const agentData = JSON.parse(sessionStorage.getItem('createAgentData') || '{}');

    // Ensure timeZone is a string (extract the 'id' from the selected timeZone object)
    if (this.currentForm.controls['timeZone'].value) {
      agentData.timeZone = this.currentForm.controls['timeZone'].value.id;
    }

    console.log('Submitting payload:', agentData);

    this.agentService.createAgent(agentData).subscribe({
      next: (response) => {
        console.log('Agent created successfully:', response);
        sessionStorage.removeItem('createAgentData'); // Clear session storage
        this.router.navigate(['agent']);
        this.resetStepper();
      },
      error: (error) => {
        console.error('Error creating agent:', error);
      },
    });
  }


  resetStepper(): void {
    this.currentForm.reset();
    this.activeStep = 0;
    this.completedSteps.fill(false);
    sessionStorage.removeItem('createAgentData'); // Clear session storage
  }
  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Unsaved data will be lost.')) {
      this.resetStepper(); // Reset the stepper and form
      sessionStorage.removeItem('createAgentData'); // Clear session storage
    }
  }
  prevStep(): void {
    if (this.activeStep > 0) {
      this.activeStep--; // Move to the previous step
      this.setupForm(); // Update the form for the previous step
    }
  }

}
