export const appointmentConfirmPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "appointmentConfirm",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 83,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "appointmentConfirm",
      "pageName": "Confirm appointment",
      "actor": "receptionist",
      "purpose": "Confirm the appointment booking after selecting customer, staff, service, and time.",
      "capabilities": [
        "bookAppointments"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "appointmentBooking"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "customer",
        "staffMember",
        "service"
      ],
      "pageInputs": [
        {
          "name": "appointmentDraftId",
          "type": "string",
          "required": true,
          "sources": [
            "previousStepResult",
            "routeParam"
          ],
          "description": "Identifier of the draft appointment to be confirmed.",
          "entityRef": "Appointment",
          "fieldRef": "Appointment.id"
        },
        {
          "name": "appointmentDraftSummary",
          "type": "object",
          "required": false,
          "sources": [
            "previousStepResult"
          ],
          "description": "Summary of selected customer, staff, service, and time for confirmation display."
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "appointmentBooking",
          "trigger": "Review appointment"
        },
        {
          "direction": "outbound",
          "pageId": "appointmentDetail",
          "trigger": "Appointment confirmed"
        }
      ],
      "sections": [
        {
          "sectionName": "Appointment summary",
          "mode": "view",
          "organisms": [
            {
              "organismName": "appointmentSummaryCard",
              "purpose": "Review the selected customer, staff member, service, and time before confirming.",
              "userActions": [],
              "requiredEntities": [
                "Customer",
                "StaffMember",
                "Service",
                "Appointment"
              ],
              "readsFields": [
                "Customer.id",
                "Customer.displayName",
                "StaffMember.id",
                "StaffMember.displayName",
                "Service.id",
                "Service.name",
                "Service.duration",
                "Service.price",
                "Appointment.scheduledStart",
                "Appointment.scheduledEnd"
              ],
              "writesFields": [],
              "rulesApplied": [
                "appointmentMustHaveCustomerStaffService"
              ]
            }
          ]
        },
        {
          "sectionName": "Confirmation",
          "mode": "create",
          "organisms": [
            {
              "organismName": "confirmAppointmentAction",
              "purpose": "Confirm and book the appointment.",
              "userActions": [
                "Book appointment"
              ],
              "requiredEntities": [
                "Appointment",
                "AvailabilitySlot",
                "Customer",
                "StaffMember",
                "Service"
              ],
              "readsFields": [],
              "writesFields": [
                "Appointment.id",
                "Appointment.lifecycleState",
                "AvailabilitySlot.status"
              ],
              "rulesApplied": [
                "appointmentMustHaveCustomerStaffService",
                "appointmentNoOverlapPerStaff"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "confirmAppointment",
        "purpose": "Create the appointment record and book the selected availability slot.",
        "kind": "command",
        "input": {
          "appointmentDraftId": "string"
        },
        "output": {
          "appointmentId": "string",
          "appointmentLifecycleState": "string",
          "confirmationMessage": "string"
        },
        "readsEntities": [
          "Appointment",
          "AvailabilitySlot",
          "Customer",
          "StaffMember",
          "Service"
        ],
        "writesEntities": [
          "Appointment",
          "AvailabilitySlot"
        ],
        "readsTables": [
          "appointment",
          "availability_slot",
          "customer",
          "staff_member",
          "service"
        ],
        "writesTables": [
          "appointment",
          "availability_slot",
          "operations_metrics"
        ],
        "usecaseRefs": [
          "bookAppointmentUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "appointmentMustHaveCustomerStaffService",
          "appointmentNoOverlapPerStaff"
        ]
      }
    ]
  }
} as const;

export default appointmentConfirmPagePlan;
