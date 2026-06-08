export const availabilitySlotTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "availabilitySlot",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 41,
    "planId": "plan-table-definition:availabilitySlot"
  },
  "data": {
    "tableDefinition": {
      "tableId": "availabilitySlot",
      "tableName": "availability_slot",
      "moduleId": "barbershopPro",
      "title": "Availability slot",
      "purpose": "Store staff availability intervals used for booking and walk-in suggestions.",
      "ownership": "moduleOwned",
      "rootEntity": "AvailabilitySlot",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "availability_slot_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Primary identifier for the availability slot."
        },
        {
          "name": "staff_member_id",
          "type": "uuid",
          "nullable": false,
          "description": "MDM staff member who owns this availability slot."
        },
        {
          "name": "start_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Start time of the availability interval."
        },
        {
          "name": "end_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "End time of the availability interval."
        },
        {
          "name": "status",
          "type": "text",
          "nullable": false,
          "description": "Lifecycle state of the slot (e.g., available, blocked, booked)."
        },
        {
          "name": "source",
          "type": "text",
          "nullable": true,
          "description": "Origin of the slot (e.g., schedule, override, booking)."
        },
        {
          "name": "created_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "When the slot was created."
        },
        {
          "name": "updated_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "When the slot was last updated."
        }
      ],
      "primaryKey": [
        "availability_slot_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "staff_member_id",
          "targetEntity": "StaffMember",
          "targetOwnership": "mdmOwned",
          "reason": "rule_mdm_exclusion"
        }
      ],
      "indexes": [
        {
          "indexName": "availability_slot_staff_start_idx",
          "columns": [
            "staff_member_id",
            "start_at"
          ],
          "unique": false,
          "reason": "Lookup slots by staff and time range for booking and schedule views."
        },
        {
          "indexName": "availability_slot_time_idx",
          "columns": [
            "start_at",
            "end_at"
          ],
          "unique": false,
          "reason": "Range scans for walk-in slot suggestions and availability queries."
        },
        {
          "indexName": "availability_slot_status_idx",
          "columns": [
            "status"
          ],
          "unique": false,
          "reason": "Filter by lifecycle state for availability and booking workflows."
        }
      ],
      "detailsColumn": {
        "enabled": false
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [],
        "updatedByLayer": "layer_3_usecases"
      },
      "accessPolicy": {
        "directAccessAllowedFor": [
          "layer_3_usecases"
        ],
        "forbiddenFor": [
          "pages",
          "layer_2_controllers",
          "agents"
        ]
      },
      "rulesApplied": [
        "appointmentNoOverlapPerStaff",
        "singleLocationScope"
      ]
    },
    "defsPlan": {
      "fileName": "tables/availabilitySlot.defs.ts",
      "exportName": "availabilitySlotTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default availabilitySlotTableDefinition;
