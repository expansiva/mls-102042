export const walkInSlotSuggestionDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "walkInSlotSuggestion",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 61,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "walkInSlotSuggestion",
      "title": "Walk-in time slot suggestion",
      "purpose": "Generate optimal walk-in time slots for today by analyzing staff availability and current appointment load.",
      "executionMode": "taskWorkflow",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "receptionist"
      ],
      "states": [
        {
          "stateId": "idle",
          "description": "No walk-in slot request is in progress."
        },
        {
          "stateId": "requesting",
          "description": "A walk-in slot request is being processed."
        },
        {
          "stateId": "suggested",
          "description": "Walk-in slot suggestions are available."
        },
        {
          "stateId": "failed",
          "description": "Walk-in slot request failed."
        }
      ],
      "transitions": [
        {
          "from": "idle",
          "to": "requesting",
          "trigger": "requestSlots",
          "actor": "receptionist",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "from": "requesting",
          "to": "suggested",
          "trigger": "suggestionsReady",
          "actor": "system",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "from": "requesting",
          "to": "failed",
          "trigger": "suggestionsFailed",
          "actor": "system",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "from": "suggested",
          "to": "requesting",
          "trigger": "refreshSuggestions",
          "actor": "receptionist",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "singleLocationScope"
          ]
        }
      ],
      "requiredEntities": [
        "AvailabilitySlot",
        "Appointment",
        "StaffMember"
      ],
      "persistenceRefs": [
        "availabilitySlot"
      ],
      "usecaseRefs": [
        "requestWalkInSlotsUsecase"
      ],
      "metricRefs": [],
      "userActions": [
        "requestSlots",
        "refreshSuggestions"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "singleLocationScope"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "cacheWalkInSuggestions",
          "title": "Cache walk-in suggestions briefly",
          "priority": "soon",
          "description": "Reduce LLM/agent load by caching suggestions for a few minutes since availability changes slowly within the current day.",
          "tradeoff": "Slightly stale suggestions possible within the cache window."
        },
        {
          "suggestionId": "noTaskWorkflow",
          "title": "Avoid task creation for walk-in suggestions",
          "priority": "now",
          "description": "Keep this workflow taskless to preserve fast, in-the-moment walk-in handling; suggestions are surfaced immediately without assignment overhead.",
          "tradeoff": "Less auditable tracking compared to task-based workflows."
        }
      ],
      "workflowScope": "singleModule",
      "moduleRefs": [
        "barbershopPro"
      ],
      "pageRefsByModule": [],
      "entityRefsByModule": [
        {
          "moduleId": "barbershopPro",
          "entity": "AvailabilitySlot"
        },
        {
          "moduleId": "barbershopPro",
          "entity": "Appointment"
        },
        {
          "moduleId": "barbershopPro",
          "entity": "StaffMember"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "barbershopPro",
          "artifactType": "workflow",
          "artifactId": "walkInSlotSuggestion"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/walkInSlotSuggestion.defs.ts",
      "exportName": "walkInSlotSuggestionDef",
      "saveAsDefs": true
    }
  }
} as const;

export default walkInSlotSuggestionDef;
