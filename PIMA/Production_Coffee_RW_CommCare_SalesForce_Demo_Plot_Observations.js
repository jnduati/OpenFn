// Your job goes here. {Coffee  - KE DPO}
//01224000000gQe5AAE

each(
"$.data",
  upsert("Observation__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", dataValue("id")),
      field("Observer__c", dataValue("form.observer")),
      field("Trainer__c", dataValue("form.trainer")),
      field("Training_Group__c", dataValue("form.training_group")),
      field("RecordTypeId", dataValue("form.record_type")),
      field("Date__c", dataValue("form.date")),
      field("Demo_Plot_Photo__c", function(state) {
        var dempPlotPhotoUrl = '';
        if(dataValue("form.Demo_Plot_Photo")(state) !== undefined && dataValue("form.Demo_Plot_Photo")(state) !== '') {
          dempPlotPhotoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.Demo_Plot_Photo")(state);
        }
        return dempPlotPhotoUrl;
      }),

      field("Observer_Signature__c", function(state) {
        var observerSignatureUrl = '';
        if(dataValue("form.Observer_Signature_Section.Observer_Signature")(state) !== undefined && dataValue("form.Observer_Signature_Section.Observer_Signature")(state) !== '') {
          observerSignatureUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.Observer_Signature_Section.Observer_Signature")(state);
        }
        return observerSignatureUrl;
      }),

      field("Observation_Location__Latitude__s", function(state) {
        if(dataValue("form.meta.location.#text")(state) !== undefined) {
          var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
          return coordinates[0];
        }
      }),
      field("Observation_Location__Longitude__s", function(state) {
        if(dataValue("form.meta.location.#text")(state) !== undefined) {
          var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
          return coordinates[1];
        }
      }),
      field("Altitude__c", function(state) {
        if(dataValue("form.meta.location.#text")(state) !== undefined) {
          var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
          return coordinates[2];
        }
      })
    )
  )
),

//HERE WE CAPTURE ALL THE DPO OBSERVATION RESULTS

// Create results for Rejuvinated_Trees {Yes || No}
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_rejuvinated_trees";
    }),
    field("Observation__c",function(state){
      return state.references[state.references.length-1].id;
    }),
    field("RecordTypeId", "01224000000gQe5AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_rejuvinated_trees"),
    field("Result__c", dataValue("form.Rejuvinated_Trees"))
  ))),

// Create results for Sucker_Selection_Taken_Place {Yes || No}
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_sucker_selection_taken_place";
    }),
    field("Observation__c",function(state){
      return state.references[state.references.length-1].id;
    }),
    field("RecordTypeId", "01224000000gQe5AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_sucker_selection_taken_place"),
    field("Result__c", dataValue("form.Sucker_Selection_Taken_Place"))
  ))),


// Create results for Maximum_of_Three_Suckers {Yes || No}
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_maximum_of_three_suckers";
    }),
    field("Observation__c",function(state){
      return state.references[state.references.length-1].id;
    }),
    field("RecordTypeId", "01224000000gQe5AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_maximum_of_three_suckers"),
    field("Result__c", dataValue("form.Maximum_of_Three_Suckers"))
  ))),


// Create results for Pruned_Demo_Plot {Yes || No}
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_pruned_demo_plot";
    }),
    field("Observation__c",function(state){
      return state.references[state.references.length-1].id;
    }),
    field("RecordTypeId", "01224000000gQe5AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_pruned_demo_plot"),
    field("Result__c", dataValue("form.Pruned_Demo_Plot"))
  ))),


// Create results for Trees_Reduced_to_2_or_3_Main_Stems {Yes || No}
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_trees_reduced_to_2_or_3_main_stems";
    }),
    field("Observation__c",function(state){
      return state.references[state.references.length-1].id;
    }),
    field("RecordTypeId", "01224000000gQe5AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_trees_reduced_to_2_or_3_main_stems"),
    field("Result__c", dataValue("form.Trees_Reduced_to_2_or_3_Main_Stems"))
  ))),


// Create results for Demo_Plots_Free_of_Weeds {Yes || No}
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_demo_plots_free_of_weeds";
    }),
    field("Observation__c",function(state){
      return state.references[state.references.length-1].id;
    }),
    field("RecordTypeId", "01224000000gQe5AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_demo_plots_free_of_weeds"),
    field("Result__c", dataValue("form.Demo_Plots_Free_of_Weeds"))
  ))),


// Create results for Mulched_Under_Coffee_Canopy {Yes || No}
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_mulched_under_coffee_canopy";
    }),
    field("Observation__c",function(state){
      return state.references[state.references.length-1].id;
    }),
    field("RecordTypeId", "01224000000gQe5AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_mulched_under_coffee_canopy"),
    field("Result__c", dataValue("form.Mulched_Under_Coffee_Canopy"))
  ))),


// Create results for X20_40_Shade_over_Demo_Plot {Yes || No}
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_X20_40_shade_over_demo_plot";
    }),
    field("Observation__c",function(state){
      return state.references[state.references.length-1].id;
    }),
    field("RecordTypeId", "01224000000gQe5AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_X20_40_shade_over_demo_plot"),
    field("Result__c", dataValue("form.X20_40_Shade_over_Demo_Plot"))
  ))),


// Create results for Shade_Trees_Planted {Yes || No}
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_shade_trees_planted";
    }),
    field("Observation__c",function(state){
      return state.references[state.references.length-1].id;
    }),
    field("RecordTypeId", "01224000000gQe5AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_shade_trees_planted"),
    field("Result__c", dataValue("form.Shade_Trees_Planted"))
  ))),


// Create results for Compost_Heap {Yes || No}
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_compost_heap";
    }),
    field("Observation__c",function(state){
      return state.references[state.references.length-1].id;
    }),
    field("RecordTypeId", "01224000000gQe5AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_compost_heap"),
    field("Result__c", dataValue("form.Compost_Heap")),
    field("Photo_URL__c", function(state) {
        var compostHeapPhotoUrl = '';
        if(dataValue("form.Photo_of_Compost_Heap")(state) !== undefined && dataValue("form.Photo_of_Compost_Heap")(state) !== '') {
          compostHeapPhotoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.Photo_of_Compost_Heap")(state);
        }
        return compostHeapPhotoUrl;
      })
  ))),


// Create results for Vertiver_Grass_on_Demo_Plot {Yes || No}
each(
  "$.data",
  upsert("Observation_Result__c", "Submission_ID__c",
    fields(
    field("Submission_ID__c", function(state) {
      return dataValue("id")(state) + "coffeeke_vertiver_grass_on_demo_plot";
    }),
    field("Observation__c",function(state){
      return state.references[state.references.length-1].id;
    }),
    field("RecordTypeId", "01224000000gQe5AAE"),
    relationship("Observation_Criterion__r", "Unique_Name__c", "coffeeke_vertiver_grass_on_demo_plot"),
    field("Result__c", dataValue("form.Vertiver_Grass_on_Demo_Plot"))
  )));
