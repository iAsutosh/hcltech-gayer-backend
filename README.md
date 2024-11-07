# hcltech-gayer-backend

END POINTS:

{
    "api": {
        "baseUrl": "https://api.hospital.com/v1",
        "endpoints": {
            "auth": {
                "POST /auth/login": {
                    "description": "Authenticate user and get access token",
                    "requestBody": {
                        "email": "string",
                        "password": "string"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "accessToken": "string",
                            "refreshToken": "string",
                            "expiresIn": 3600
                        }
                    }
                },
                "POST /auth/refresh": {
                    "description": "Refresh access token",
                    "requestBody": {
                        "refreshToken": "string"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "accessToken": "string",
                            "expiresIn": 3600
                        }
                    }
                },
                "POST /auth/logout": {
                    "description": "Invalidate current session",
                    "response": {
                        "status": 200,
                        "data": {
                            "message": "Logged out successfully"
                        }
                    }
                }
            },
            "patients": {
                "GET /patients": {
                    "description": "Get list of all patients",
                    "parameters": {
                        "page": "integer (optional)",
                        "limit": "integer (optional)",
                        "searchTerm": "string (optional)"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "patients": [
                                {
                                    "id": "P001",
                                    "firstName": "John",
                                    "lastName": "Doe",
                                    "dateOfBirth": "1990-05-15",
                                    "gender": "male",
                                    "contactNumber": "+1-555-0123",
                                    "email": "john.doe@email.com",
                                    "address": "123 Main St, City, State 12345"
                                }
                            ],
                            "totalCount": 1,
                            "currentPage": 1,
                            "totalPages": 1
                        }
                    }
                },
                "GET /patients/{id}": {
                    "description": "Get patient details by ID",
                    "response": {
                        "status": 200,
                        "data": {
                            "id": "P001",
                            "firstName": "John",
                            "lastName": "Doe",
                            "dateOfBirth": "1990-05-15",
                            "gender": "male",
                            "contactNumber": "+1-555-0123",
                            "email": "john.doe@email.com",
                            "address": "123 Main St, City, State 12345",
                            "medicalHistory": [
                                {
                                    "condition": "Hypertension",
                                    "diagnosedDate": "2020-03-15",
                                    "status": "ongoing"
                                }
                            ]
                        }
                    }
                },
                "POST /patients": {
                    "description": "Create new patient",
                    "requestBody": {
                        "firstName": "string",
                        "lastName": "string",
                        "dateOfBirth": "date",
                        "gender": "string",
                        "contactNumber": "string",
                        "email": "string",
                        "address": "string"
                    },
                    "response": {
                        "status": 201,
                        "data": {
                            "id": "P002",
                            "message": "Patient created successfully"
                        }
                    }
                }
            },
            "appointments": {
                "GET /appointments": {
                    "description": "Get list of appointments",
                    "parameters": {
                        "date": "date (optional)",
                        "doctorId": "string (optional)",
                        "patientId": "string (optional)"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "appointments": [
                                {
                                    "id": "A001",
                                    "patientId": "P001",
                                    "doctorId": "D001",
                                    "dateTime": "2024-03-20T10:30:00Z",
                                    "status": "scheduled",
                                    "type": "regular checkup"
                                }
                            ]
                        }
                    }
                },
                "POST /appointments": {
                    "description": "Schedule new appointment",
                    "requestBody": {
                        "patientId": "string",
                        "doctorId": "string",
                        "dateTime": "datetime",
                        "type": "string"
                    },
                    "response": {
                        "status": 201,
                        "data": {
                            "id": "A002",
                            "message": "Appointment scheduled successfully"
                        }
                    }
                }
            },
            "doctors": {
                "GET /doctors": {
                    "description": "Get list of doctors",
                    "parameters": {
                        "department": "string (optional)",
                        "specialization": "string (optional)"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "doctors": [
                                {
                                    "id": "D001",
                                    "firstName": "Jane",
                                    "lastName": "Smith",
                                    "specialization": "Cardiology",
                                    "department": "Cardiac Care",
                                    "availability": {
                                        "monday": "09:00-17:00",
                                        "tuesday": "09:00-17:00",
                                        "wednesday": "09:00-17:00",
                                        "thursday": "09:00-17:00",
                                        "friday": "09:00-15:00"
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            "prescriptions": {
                "GET /prescriptions/{patientId}": {
                    "description": "Get patient prescriptions",
                    "response": {
                        "status": 200,
                        "data": {
                            "prescriptions": [
                                {
                                    "id": "PR001",
                                    "patientId": "P001",
                                    "doctorId": "D001",
                                    "date": "2024-03-15",
                                    "medications": [
                                        {
                                            "name": "Amoxicillin",
                                            "dosage": "500mg",
                                            "frequency": "3 times daily",
                                            "duration": "7 days"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                },
                "POST /prescriptions": {
                    "description": "Create new prescription",
                    "requestBody": {
                        "patientId": "string",
                        "doctorId": "string",
                        "medications": [
                            {
                                "name": "string",
                                "dosage": "string",
                                "frequency": "string",
                                "duration": "string"
                            }
                        ]
                    },
                    "response": {
                        "status": 201,
                        "data": {
                            "id": "PR002",
                            "message": "Prescription created successfully"
                        }
                    }
                }
            },
            "billing": {
                "GET /bills/{patientId}": {
                    "description": "Get patient bills",
                    "response": {
                        "status": 200,
                        "data": {
                            "bills": [
                                {
                                    "id": "B001",
                                    "patientId": "P001",
                                    "date": "2024-03-15",
                                    "items": [
                                        {
                                            "description": "Consultation",
                                            "amount": 150.00
                                        },
                                        {
                                            "description": "Laboratory Tests",
                                            "amount": 300.00
                                        }
                                    ],
                                    "totalAmount": 450.00,
                                    "status": "pending"
                                }
                            ]
                        }
                    }
                },
                "POST /bills/payment": {
                    "description": "Process bill payment",
                    "requestBody": {
                        "billId": "string",
                        "amount": "number",
                        "paymentMethod": "string"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "transactionId": "T001",
                            "message": "Payment processed successfully"
                        }
                    }
                }
            }
        }
    }
}
