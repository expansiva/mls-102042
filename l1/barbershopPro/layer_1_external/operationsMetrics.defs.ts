export const operationsMetricsMetricTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "operationsMetrics",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 47,
    "planId": "plan-metric-table-definition:operationsMetrics"
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "operationsMetrics",
      "tableName": "operations_metrics",
      "moduleId": "barbershopPro",
      "title": "Operations metrics",
      "purpose": "Track daily bookings, revenue, staff utilization, and appointment lifecycle trends to power the owner dashboard and operational summaries.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "recorded_at",
      "columns": [
        {
          "name": "recorded_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp when the metric event was recorded."
        },
        {
          "name": "staff_member_id",
          "type": "uuid",
          "nullable": true,
          "description": "Staff member associated with the metric event."
        },
        {
          "name": "service_id",
          "type": "uuid",
          "nullable": true,
          "description": "Service associated with the appointment or sale."
        },
        {
          "name": "appointment_status",
          "type": "text",
          "nullable": true,
          "description": "Lifecycle status of the appointment."
        },
        {
          "name": "metric_category",
          "type": "text",
          "nullable": false,
          "description": "Category of the metric: booking, sale, utilization, cancellation, noShow."
        },
        {
          "name": "booking_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Number of bookings."
        },
        {
          "name": "revenue",
          "type": "numeric",
          "nullable": false,
          "default": 0,
          "description": "Revenue from services and products."
        },
        {
          "name": "utilization_minutes",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Booked service minutes."
        },
        {
          "name": "available_minutes",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Available staff minutes."
        },
        {
          "name": "cancellation_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Number of cancelled appointments."
        },
        {
          "name": "no_show_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Number of no-show appointments."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "staffMember",
          "column": "staff_member_id",
          "type": "uuid",
          "description": "Staff member associated with the metric event."
        },
        {
          "dimensionId": "service",
          "column": "service_id",
          "type": "uuid",
          "description": "Service associated with the appointment or sale."
        },
        {
          "dimensionId": "appointmentStatus",
          "column": "appointment_status",
          "type": "text",
          "description": "Lifecycle status of the appointment."
        },
        {
          "dimensionId": "metricCategory",
          "column": "metric_category",
          "type": "text",
          "description": "Category of the metric: booking, sale, utilization, cancellation, noShow."
        }
      ],
      "measures": [
        {
          "measureId": "bookingCount",
          "column": "booking_count",
          "aggregation": "sum",
          "unit": "count",
          "description": "Number of bookings."
        },
        {
          "measureId": "revenue",
          "column": "revenue",
          "aggregation": "sum",
          "unit": "USD",
          "description": "Revenue from services and products."
        },
        {
          "measureId": "utilizationMinutes",
          "column": "utilization_minutes",
          "aggregation": "sum",
          "unit": "minutes",
          "description": "Booked service minutes."
        },
        {
          "measureId": "availableMinutes",
          "column": "available_minutes",
          "aggregation": "sum",
          "unit": "minutes",
          "description": "Available staff minutes."
        },
        {
          "measureId": "cancellationCount",
          "column": "cancellation_count",
          "aggregation": "sum",
          "unit": "count",
          "description": "Number of cancelled appointments."
        },
        {
          "measureId": "noShowCount",
          "column": "no_show_count",
          "aggregation": "sum",
          "unit": "count",
          "description": "Number of no-show appointments."
        }
      ],
      "sourceWriteEvents": [
        "createAppointmentUsecase",
        "rescheduleAppointmentUsecase",
        "cancelAppointmentUsecase",
        "checkInAppointmentUsecase",
        "completeAppointmentUsecase",
        "recordSaleUsecase",
        "updateStaffScheduleUsecase"
      ],
      "hypertable": {
        "timeColumn": "recorded_at",
        "chunkTimeInterval": "7 days",
        "retentionPolicy": "1 year",
        "compressionPolicy": "30 days",
        "indexes": [
          {
            "indexName": "operations_metrics_recorded_at_idx",
            "columns": [
              "recorded_at"
            ],
            "purpose": "Primary time-series access for range scans."
          },
          {
            "indexName": "operations_metrics_staff_member_time_idx",
            "columns": [
              "staff_member_id",
              "recorded_at"
            ],
            "purpose": "Filter metrics by staff member over time."
          },
          {
            "indexName": "operations_metrics_service_time_idx",
            "columns": [
              "service_id",
              "recorded_at"
            ],
            "purpose": "Filter metrics by service over time."
          },
          {
            "indexName": "operations_metrics_status_time_idx",
            "columns": [
              "appointment_status",
              "recorded_at"
            ],
            "purpose": "Filter by appointment status over time."
          },
          {
            "indexName": "operations_metrics_category_time_idx",
            "columns": [
              "metric_category",
              "recorded_at"
            ],
            "purpose": "Filter by metric category over time."
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "createAppointmentUsecase",
          "rescheduleAppointmentUsecase",
          "cancelAppointmentUsecase",
          "checkInAppointmentUsecase",
          "completeAppointmentUsecase",
          "recordSaleUsecase",
          "updateStaffScheduleUsecase"
        ]
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
        "singleLocationScope"
      ]
    },
    "defsPlan": {
      "fileName": "tables/operationsMetrics.defs.ts",
      "exportName": "operationsMetricsMetricTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default operationsMetricsMetricTableDefinition;
