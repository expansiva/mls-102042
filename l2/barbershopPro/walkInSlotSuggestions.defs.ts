export const walkInSlotSuggestionsPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "walkInSlotSuggestions",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 94,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "walkInSlotSuggestions",
      "pageName": "Walk-in slot suggestions",
      "actor": "receptionist",
      "purpose": "Request and review suggested walk-in time slots.",
      "capabilities": [
        "llmRecommendations"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [
          "walkInSlotSuggestion"
        ],
        "automations": []
      },
      "pluginRefs": [
        "llmWalkInSlot"
      ],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "desiredDate",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam",
            "previousStepResult"
          ],
          "description": "Preferred date to request walk-in suggestions for."
        },
        {
          "name": "servicePreference",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam",
            "previousStepResult"
          ],
          "description": "Preferred service for the walk-in request."
        }
      ],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "appointmentBooking",
          "trigger": "Book suggested slot",
          "description": "Start booking for a selected suggested slot."
        }
      ],
      "sections": [
        {
          "sectionName": "Request walk-in suggestions",
          "mode": "create",
          "organisms": [
            {
              "organismName": "walkInSlotRequestForm",
              "purpose": "Capture desired date and service to request walk-in slot suggestions.",
              "userActions": [
                "Request walk-in time slots",
                "Refresh suggestions"
              ],
              "requiredEntities": [
                "AvailabilitySlot",
                "StaffMember"
              ],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": [
                "RULE_singleLocationScope"
              ]
            }
          ]
        },
        {
          "sectionName": "Suggested time slots",
          "mode": "view",
          "organisms": [
            {
              "organismName": "walkInSlotSuggestionList",
              "purpose": "Display recommended walk-in time slots and allow selection for booking.",
              "userActions": [
                "Select suggested slot",
                "Book suggested slot"
              ],
              "requiredEntities": [
                "AvailabilitySlot",
                "StaffMember"
              ],
              "readsFields": [
                "AvailabilitySlot.startTime",
                "AvailabilitySlot.endTime",
                "AvailabilitySlot.staffMemberId"
              ],
              "writesFields": [],
              "rulesApplied": [
                "RULE_singleLocationScope"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "requestWalkInSlotSuggestions",
        "purpose": "Get walk-in slot recommendations.",
        "kind": "command",
        "input": {
          "desiredDate": "date",
          "servicePreference": "string"
        },
        "output": {
          "suggestions": [
            {
              "availabilitySlotId": "string",
              "startTime": "datetime",
              "endTime": "datetime",
              "staffMemberId": "string",
              "staffMemberName": "string",
              "confidenceScore": "number"
            }
          ]
        },
        "readsEntities": [
          "AvailabilitySlot",
          "Appointment",
          "StaffMember"
        ],
        "writesEntities": [
          "AvailabilitySlot"
        ],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "requestWalkInSlotsUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "RULE_singleLocationScope"
        ]
      }
    ]
  }
} as const;

export default walkInSlotSuggestionsPagePlan;
