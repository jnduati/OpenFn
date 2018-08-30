
each(
  "$.data",
  
  //benibiz_obstacle_strategy
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"six_month_strategy";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.six_month_strategy")),
            
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_obstacle_strategy"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_better_product
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"better_product";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.better_product")),
            
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_better_product"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_better_product
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"better_product";
        return submission;
      }),
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.better_product")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_better_product"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_new_customers
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_new_customers";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.new_customers")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_new_customers"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_regular_records
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_regular_records";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.regular_records")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_regular_records"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  //benibiz_finance_records

  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_finance_records";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.finance_records")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_finance_records"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  //benibiz_sales_records
  upsert(
    
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_sales_records";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.sales_records")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_sales_records"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_customer_segment
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_customer_segment";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.customer_segment")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_customer_segment"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_profit_and_loss
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_profit_and_loss";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.profit_and_loss")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_profit_and_loss"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_cost_of_product
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_cost_of_product";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.cost_of_product")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_cost_of_product"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_profitable_price
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_profitable_price";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.profitable_price")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_profitable_price"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_profitable_product
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_profitable_product";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.profitable_product")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_profitable_product"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_salary
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_salary";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.salary")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_salary"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_written_budget
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_written_budget";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.written_budget")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_written_budget"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_loan_records
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_loan_records";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.loan_records")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_loan_records"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_not_out_of_stock
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_not_out_of_stock";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.not_out_of_stock")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_not_out_of_stock"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  //benibiz_regular_savings
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_regular_savings";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.regular_savings")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_regular_savings"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_commercial_documents
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_commercial_documents";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.commercial_documents")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_commercial_documents"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_know_customers
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_know_customers";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.know_customers")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_know_customers"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_know_products
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_know_products";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.know_products")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_know_products"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_adapts_products
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_adapts_products";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.adapts_products")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_adapts_products"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_promotes_products
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_promotes_products";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.promotes_products")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_promotes_products"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_visit_competitor
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_visit_competitor";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.visit_competitor")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_visit_competitor"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_asks_customers_products
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_asks_customers_products";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.asks_customers_products")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_asks_customers_products"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_asks_customers_why
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_asks_customers_why";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.asks_customers_why")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_asks_customers_why"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_reviews_finances
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_reviews_finances";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.reviews_finances")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_reviews_finances"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_forecasts_sales
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_forecasts_sales";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.forecasts_sales")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_forecasts_sales"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_income_statement
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_income_statement";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.income_statement")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_income_statement"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_cash_flow_statement
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_cash_flow_statement";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.cash_flow_statement")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_cash_flow_statement"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_growth_plan
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_growth_plan";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.growth_plan")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_growth_plan"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_growth_financing
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_growth_financing";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.growth_financing")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_growth_financing"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
  // **benibiz_annual_report
  upsert(
    "Client_Activity__c", "Submission_ID__c",
    fields(
      
      //UPDATE SUBMISSION ID WITH PRACTICE UNIQUE NAME
      field("Submission_ID__c", function(state) {
        var submission = dataValue("id")(state)+dataValue("form.case.@case_id")(state)+"benibiz_annual_report";
        return submission;
      }),
      
      relationship("Client__r", "CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field("RecordTypeId", "0121o00000115AVAAY"),
      field("Project_Staff__c", dataValue("form.project_staff")),
      field("Date__c", dataValue("form.name_and_date_group.date")),
      
      //UPDATE RESULT WITH ID FROM COMMCARE
      field("Result__c", dataValue("form.annual_report")),
      
      //PRACTICE GOES HERE
      relationship("Practice__r", "Unique_Name__c", "benibiz_annual_report"),
      
      field("Comments__c", function(state) {
        var location = dataValue("form.location")(state);
        var village = dataValue("form.village")(state);
        var comment = "Assessment Location: "+location+"\n"+"\n"+
        "Village: "+village;
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
  
  
// Version Control 3
