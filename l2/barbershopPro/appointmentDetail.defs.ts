export const appointmentDetailPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "appointmentDetail",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 86,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "appointmentDetail",
      "pageName": "Appointment details",
      "actor": "receptionist",
      "purpose": "Review appointment details and proceed to check-in or checkout.",
      "capabilities": [
        "bookAppointments",
        "checkInAndCheckout"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "appointmentBooking",
          "checkInCheckout"
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
          "name": "appointmentId",
          "type": "string",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identifier of the appointment to display.",
          "entityRef": "Appointment",
          "fieldRef": "Appointment.id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "appointmentCalendar",
          "trigger": "View appointment"
        },
        {
          "direction": "outbound",
          "pageId": "appointmentCheckIn",
          "trigger": "Check in"
        },
        {
          "direction": "outbound",
          "pageId": "appointmentCheckout",
          "trigger": "Complete appointment"
        },
        {
          "direction": "outbound",
          "pageId": "recordSale",
          "trigger": "Record sale"
        }
      ],
      "sections": [
        {
          "sectionName": "Appointment summary",
          "mode": "read",
          "organisms": [
            {
              "organismName": "appointmentSummaryPanel",
              "purpose": "Show appointment status, schedule, and key details.",
              "userActions": [],
              "requiredEntities": [
                "Appointment"
              ],
              "readsFields": [
                "Appointment.id",
                "Appointment.lifecycleState",
                "Appointment.startTime",
                "Appointment.endTime",
                "Appointment.notes",
                "Appointment.serviceIds",
                "Appointment.customerId",
                "Appointment.staffMemberId"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Customer and staff",
          "mode": "read",
          "organisms": [
            {
              "organismName": "customerProfileSummary",
              "purpose": "Show the customer associated with the appointment.",
              "userActions": [
                "View customer profile"
              ],
              "requiredEntities": [
                "Customer"
              ],
              "readsFields": [
                "Customer.id",
                "Customer.fullName",
                "Customer.phone",
                "Customer.email"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "staffMemberSummary",
              "purpose": "Show the assigned staff member.",
              "userActions": [
                "View staff schedule"
              ],
              "requiredEntities": [
                "StaffMember"
              ],
              "readsFields": [
                "StaffMember.id",
                "StaffMember.fullName",
                "StaffMember.role"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Services",
          "mode": "read",
          "organisms": [
            {
              "organismName": "serviceListSummary",
              "purpose": "List services linked to the appointment.",
              "userActions": [],
              "requiredEntities": [
                "Service"
              ],
              "readsFields": [
                "Service.id",
                "Service.name",
                "Service.duration",
                "Service.price"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getAppointmentDetail",
        "purpose": "Load appointment details, customer, staff, and services.",
        "kind": "query",
        "input": {
          "appointmentId": "string"
        },
        "output": {
          "appointment": {
            "id": "string",
            "lifecycleState": "string",
            "startTime": "string",
            "endTime": "string",
            "notes": "string",
            "customerId": "string",
            "staffMemberId": "string",
            "serviceIds": [
              "string"
            ]
          },
          "customer": {
            "id": "string",
            "fullName": "string",
            "phone": "string",
            "email": "string"
          },
          "staffMember": {
            "id": "string",
            "fullName": "string",
            "role": "string"
          },
          "services": [
            {
              "id": "string",
              "name": "string",
              "duration": "number",
              "price": "number"
            }
          ]
        },
        "readsEntities": [
          "Appointment",
          "Customer",
          "StaffMember",
          "Service"
        ],
        "writesEntities": [],
        "readsTables": [
          "appointment"
        ],
        "writesTables": [],
        "usecaseRefs": [],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      }
    ]
  }
} as const;

export default appointmentDetailPagePlan;
