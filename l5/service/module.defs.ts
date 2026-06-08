export const serviceMdmModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmDomain",
  "artifactId": "service",
  "moduleName": "service",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdm",
    "moduleId": "service",
    "domainId": "service",
    "plannedByModule": "barbershopPro",
    "referencesExisting": false,
    "domain": {
      "domainId": "service",
      "title": "Service",
      "masterEntities": [
        "Service"
      ],
      "sourceOfTruth": "serviceCatalogService",
      "consumers": [
        "appointmentBookingPage",
        "serviceCatalogPage",
        "upsellSuggestionWorkflow",
        "recommendationAgent",
        "createServiceUsecase",
        "updateServiceUsecase",
        "requestUpsellSuggestionUsecase"
      ],
      "governanceRules": [
        "Master service records are governed by serviceDurationPriceRequired and singleLocationScope",
        "Service catalog changes require manager approval"
      ]
    }
  }
} as const;

export default serviceMdmModulePlan;
