export const notificationsModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "horizontalModule",
  "artifactId": "notifications",
  "moduleName": "notifications",
  "status": "draft",
  "source": {
    "agentName": "agentPlanHorizontals",
    "stepId": 13,
    "planId": "plan-horizontals"
  },
  "data": {
    "kind": "horizontal",
    "moduleId": "notifications",
    "horizontalModuleId": "notifications",
    "plannedByModule": "barbershopPro",
    "referencesExisting": false,
    "module": {
      "horizontalModuleId": "notifications",
      "priority": "soon",
      "reason": "Workflows include booking/reschedule flows that need confirmation and schedule-change communications.",
      "reusedOntologyRefs": [
        "NotificationTemplate",
        "NotificationDelivery",
        "NotificationPreference"
      ],
      "consumedByArtifacts": [
        "appointmentBookingWorkflow",
        "bookAppointment",
        "rescheduleAppointment",
        "cancelAppointment"
      ]
    }
  }
} as const;

export default notificationsModulePlan;
