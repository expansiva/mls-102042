export const appointmentCheckInPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "appointmentCheckIn",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 87,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "appointmentCheckIn",
      "pageName": "Check in appointment",
      "actor": "receptionist",
      "purpose": "Mark the customer as checked in and start the service.",
      "capabilities": [
        "checkInAndCheckout"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
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
            "routeParam"
          ],
          "description": "Appointment identifier for check-in.",
          "entityRef": "Appointment",
          "fieldRef": "Appointment.id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "appointmentDetail",
          "trigger": "Check in"
        },
        {
          "direction": "outbound",
          "pageId": "appointmentDetail",
          "trigger": "Check-in completed"
        }
      ],
      "sections": [
        {
          "sectionName": "Check-in confirmation",
          "mode": "confirm",
          "organisms": [
            {
              "organismName": "checkInConfirmation",
              "purpose": "Confirm the check-in action for the selected appointment.",
              "userActions": [
                "Check in appointment"
              ],
              "requiredEntities": [
                "Appointment"
              ],
              "readsFields": [
                "Appointment.id"
              ],
              "writesFields": [
                "Appointment.status"
              ],
              "rulesApplied": [
                "RULE_singleLocationScope",
                "RULE_appointmentMustHaveCustomerStaffService"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "checkInAppointment",
        "purpose": "Record appointment check-in.",
        "kind": "command",
        "input": {
          "appointmentId": "string"
        },
        "output": {
          "appointmentId": "string",
          "status": "string",
          "checkedInAt": "string"
        },
        "readsEntities": [
          "Appointment"
        ],
        "writesEntities": [
          "Appointment"
        ],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "checkInAppointmentUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "RULE_appointmentMustHaveCustomerStaffService",
          "RULE_singleLocationScope"
        ]
      }
    ]
  }
} as const;

export default appointmentCheckInPagePlan;
