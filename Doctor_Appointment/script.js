const doctors = [
  { id: 1, name: 'Dr. Kishore', specialty: 'General Practitioner', available_slots_per_day: 10 },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrician', available_slots_per_day: 8 },
  { id: 3, name: 'Dr. Michael Johnson', specialty: 'Cardiologist', available_slots_per_day: 6 }
];

const patients = [];

const appointments = [];

const doctorSlotsContainer = document.getElementById('doctor-slots');
const registrationForm = document.getElementById('registration-form');
const bookingContainer = document.getElementById('booking-container');
const summaryContainer = document.getElementById('summary-container');

// Display available appointment slots for each doctor
function displayDoctorAvailability() {
  doctorSlotsContainer.innerHTML = '';

  doctors.forEach((doctor) => {
    const doctorCard = document.createElement('div');
    doctorCard.className = 'doctor-card';
    doctorCard.innerHTML = `
      <h3>${doctor.name}</h3>
      <p>${doctor.specialty}</p>
      <button class="book-appointment" data-doctor-id="${doctor.id}">
        View Available Slots
      </button>
      <button class="view-summary" data-doctor-id="${doctor.id}">
        View Appointment Summary
      </button>
    `;
    doctorSlotsContainer.appendChild(doctorCard);

    const bookAppointmentButton = doctorCard.querySelector('.book-appointment');
    bookAppointmentButton.addEventListener('click', () => {
      displayAvailableAppointmentSlots(doctor.id);
    });

    const viewSummaryButton = doctorCard.querySelector('.view-summary');
    viewSummaryButton.addEventListener('click', () => {
      generateAppointmentSummary(doctor.id);
    });
  });
}

// Display available appointment slots for a specific doctor
function displayAvailableAppointmentSlots(doctorId) {
  const doctor = doctors.find((d) => d.id === doctorId);
  const availableSlots = getAvailableAppointmentSlots(doctor);

  bookingContainer.innerHTML = '';
  availableSlots.forEach((slot) => {
    const slotElement = document.createElement('div');
    slotElement.className = 'appointment-slot';
    slotElement.innerHTML = `
      <p>Date: ${slot.date}</p>
      <p>Time: ${slot.time}</p>
      <button class="book-slot" data-slot-id="${slot.id}">Book Appointment</button>
    `;
    slotElement.querySelector('.book-slot').addEventListener('click', () => {
      bookAppointment(slot.id, doctor.id);
    });
    bookingContainer.appendChild(slotElement);
  });
}

// Get available appointment slots for a doctor
function getAvailableAppointmentSlots(doctor) {
  const slots = [];
  for (let i = 0; i < doctor.available_slots_per_day; i++) {
    slots.push({
      id: i,
      date: '2023-04-17', // Replace with the actual appointment date
      time: `${9 + i}:00 AM` // Replace with the actual appointment time
    });
  }

  // Check and remove booked slots
  const bookedSlots = appointments.filter((appointment) => appointment.doctor_id === doctor.id);
  bookedSlots.forEach((bookedSlot) => {
    const index = slots.findIndex((slot) => slot.date === bookedSlot.appointment_date && slot.time === bookedSlot.appointment_time);
    if (index !== -1) {
      slots.splice(index, 1);
    }
  });

  return slots;
}

// Register a patient
function registerPatient() {
  const formData = new FormData(registrationForm);
  const patient = {
    id: patients.length + 1,
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    registration_fee: 50 // Replace with the actual registration fee
  };

  patients.push(patient);
  console.log('Patient registered:', patient);
  return patient;
}

// Book an appointment
function bookAppointment(slotId, doctorId) {
  const patient = registerPatient();
  const appointment = {
    id: appointments.length + 1,
    doctor_id: doctorId,
    patient_id: patient.id,
    appointment_date: '2023-04-17', // Replace with the actual appointment date
    appointment_time: '10:00 AM', // Replace with the actual appointment time
    notes: 'Patient has a history of allergies.'
  };

  appointments.push(appointment);
  console.log('Appointment booked:', appointment);
  displayDoctorAvailability(); // Update the available slots
}

// Generate appointment summary for a doctor
function generateAppointmentSummary(doctorId) {
  const doctorAppointments = appointments.filter((appointment) => appointment.doctor_id === doctorId);
  const doctor = doctors.find((d) => d.id === doctorId);

  summaryContainer.innerHTML = '';
  const summaryElement = document.createElement('div');
  summaryElement.innerHTML = `
    <h2>Appointment Summary for ${doctor.name}</h2>
  `;
  summaryContainer.appendChild(summaryElement);

  doctorAppointments.forEach((appointment) => {
    const patient = patients.find((p) => p.id === appointment.patient_id);
    const appointmentElement = document.createElement('div');
    appointmentElement.className = 'appointment-summary';
    appointmentElement.innerHTML = `
      <h3>Patient: ${patient.name}</h3>
      <p>Appointment Date: ${appointment.appointment_date}</p>
      <p>Appointment Time: ${appointment.appointment_time}</p>
      <p>Notes: ${appointment.notes}</p>
    `;
    summaryContainer.appendChild(appointmentElement);
  });
}

// Initialize the application
displayDoctorAvailability();
