
each(
  "$.data",
  
  //benibiz_monthly_sales
  upsertIf(
    state.data.form.sales_details.revenue !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_monthly_sales";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Value__c", dataValue("form.sales_details.revenue")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_sales"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var comment = "Assessment Location: "+location;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  )),
  
  each(
  "$.data",
  //benibiz_monthly_variable_costs
  upsertIf(
    state.data.form.sales_details.variable_expenses !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_monthly_variable_costs";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Value__c", dataValue("form.sales_details.variable_expenses")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_variable_costs"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var comment = "Assessment Location: "+location;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  )),
  
  each(
  "$.data",
  //benibiz_monthly_fixed_costs
  upsertIf(
    state.data.form.sales_details.fixed_expenses !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_monthly_fixed_costs";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Value__c", dataValue("form.sales_details.fixed_expenses")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_fixed_costs"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var comment = "Assessment Location: "+location;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  )),
  
  each(
  "$.data",
  //benibiz_monthly_gross_profit
  upsertIf(
    state.data.form.sales_details.gross_profit !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_monthly_gross_profit";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Value__c", dataValue("form.sales_details.gross_profit")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_gross_profit"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var comment = "Assessment Location: "+location;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  )),
  
  each(
  "$.data",
  //benibiz_monthly_net_profit
  upsertIf(
    state.data.form.sales_details.net_profit !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_monthly_net_profit";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Value__c", dataValue("form.sales_details.net_profit")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_net_profit"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var comment = "Assessment Location: "+location;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  )),
  
  each(
  "$.data",
  //benibiz_monthly_fte_12
  upsertIf(
    state.data.form.employment_details.fte_count_12_months !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"fte_count_12_months";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Value__c", dataValue("form.employment_details.fte_count_12_months")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_fte_12"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var comment = "Assessment Location: "+location;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  )),
  
  each(
  "$.data",
  //benibiz_monthly_fte_4
  upsertIf(
    state.data.form.employment_details.fte_count_4_months !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"fte_count_4_months";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Value__c", dataValue("form.employment_details.fte_count_4_months")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_fte_4"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var comment = "Assessment Location: "+location;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  )),
  
  each(
  "$.data",
  //benibiz_monthly_fte_3
  upsertIf(
    state.data.form.employment_details.fte_count_3_months !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_monthly_fte_3";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Value__c", dataValue("form.employment_details.fte_count_3_months")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_fte_3"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var comment = "Assessment Location: "+location;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  )),
  
  each(
  "$.data",
  //benibiz_monthly_fte_6
  upsertIf(
    state.data.form.employment_details.fte_count_6_months !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_monthly_fte_6";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Value__c", dataValue("form.employment_details.fte_count_6_months")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_fte_6"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var comment = "Assessment Location: "+location;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  )),
  
  each(
  "$.data",
  //benibiz_monthly_fte_2
  upsertIf(
    state.data.form.employment_details.fte_count_2_months !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_monthly_fte_2";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Value__c", dataValue("form.employment_details.fte_count_2_months")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_fte_2"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var comment = "Assessment Location: "+location;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  )),
  
  each(
  "$.data",
  //benibiz_monthly_seasonal_employees
  upsertIf(
    state.data.form.employment_details.non_perm_employees !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_monthly_seasonal_employees";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Value__c", dataValue("form.employment_details.non_perm_employees")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_seasonal_employees"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var comment = "Assessment Location: "+location;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  )),
  
  each(
  "$.data",
  //benibiz_monthly_contracts_dutch
  upsertIf(
    state.data.form.contracts_details.dutch_contracts !== undefined,
    "Client_Activity__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_monthly_contracts_dutch";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115ATAAY"),
      field("Project_Staff__c", dataValue("form.trainer")),
      field("Date__c", dataValue("form.date_location_details.date")),
      field("Yes_No__c", dataValue("form.contracts_details.dutch_contracts")),
      relationship("Indicator__r", "Unique_Name__c", "benibiz_monthly_contracts_dutch"),
      field("Comments__c", function(state) {
        var location = dataValue("form.date_location_details.training_location")(state);
        var explain = dataValue("form.contracts_details.explain_contracts")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Contracts Details: "+explain;
        return comment;
      }),
      field("Status__c", "Complete"),
      field('GPS_Location__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Location__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.gps_coordinates;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
    )
  ));

// Version control test 2