

function DataConverter(nodeId) {

 

  this.nodeId                 = nodeId;
  this.node                   = $("#"+nodeId);

  this.outputDataTypes        = [
                                {"text":"XML - Properties",       "id":"xmlProperties",    "notes":""},
								{"text":"XML - Tally Receipt",            "id":"xmlR",              "notes":""},
                                {"text":"XML - Tally Payment",            "id":"xmlP",              "notes":""}];
  this.outputDataType         = "json";

  this.columnDelimiter        = "\t";
  this.rowDelimiter           = "\n";

  this.inputTextArea          = {};
  this.outputTextArea         = {};

  this.inputHeader            = {};
  this.outputHeader           = {};
  this.dataSelect             = {};

  this.inputText              = "";
  this.outputText             = "";

  this.newLine                = "\n";
  this.indent                 = "  ";

  this.commentLine            = "//";
  this.commentLineEnd         = "";
  this.tableName              = "TallyXML"

  this.useUnderscores         = true;
  this.headersProvided        = true;
  this.downcaseHeaders        = true;
  this.upcaseHeaders          = false;
  this.includeWhiteSpace      = true;
  this.useTabsForIndent       = false;

}


DataConverter.prototype.create = function(w,h) {
  var self = this;

  //build HTML for converter
  this.inputHeader = $('<div class="groupHeader" id="inputHeader"><p class="groupHeadline">Paste Data as per Templates <span class="subhead"> <a href="#" id="insertSample">  Use sample - </a><a class="btn btn-primary" title="Download Template Here (Template.xlsx)" href="excel/Template.xlsx" download=""><i class="fa fa-download" aria-hidden="true"></i> Download Template Here </a></span></p></div>');
  this.inputTextArea = $('<textarea class="textInputs" id="dataInput"></textarea>');
  var outputHeaderText = '<div class="groupHeader" id="inputHeader"><p class="groupHeadline">Choose XML Type -  <select name="Data Types" id="dataSelector" >';
    for (var i=0; i < this.outputDataTypes.length; i++) {

      outputHeaderText += '<option value="'+this.outputDataTypes[i]["id"]+'" '
              + (this.outputDataTypes[i]["id"] == this.outputDataType ? 'selected="selected"' : '')
              + '>'
              + this.outputDataTypes[i]["text"]+'</option>';
    };
    outputHeaderText += '</select><span class="subhead" id="outputNotes"></span></p></div>';
  this.outputHeader = $(outputHeaderText);
  this.outputTextArea = $('<textarea class="textInputs" id="dataOutput"></textarea>');

  this.node.append(this.inputHeader);
  this.node.append(this.inputTextArea);
  this.node.append(this.outputHeader);
  this.node.append(this.outputTextArea);

  this.dataSelect = this.outputHeader.find("#dataSelector");



  this.outputTextArea.click(function(evt){this.select();});


  $("#insertSample").bind('click',function(evt){
    evt.preventDefault();
    self.insertSampleData();
    self.convert();
    _gaq.push(['_trackEvent', 'SampleData','InsertGeneric']);
  });

  $("#dataInput").keyup(function() {self.convert()});
  $("#dataInput").change(function() {
    self.convert();
    _gaq.push(['_trackEvent', 'DataType',self.outputDataType]);
  });

  $("#dataSelector").bind('change',function(evt){
       self.outputDataType = $(this).val();
       self.convert();
     });

  this.resize(w,h);
}

DataConverter.prototype.resize = function(w,h) {

  var paneWidth = w;
  var paneHeight = (h-90)/2-20;

  this.node.css({width:paneWidth});
  this.inputTextArea.css({width:paneWidth-20,height:paneHeight});
  this.outputTextArea.css({width: paneWidth-20, height:paneHeight});

}

DataConverter.prototype.convert = function() {

  this.inputText = this.inputTextArea.val();
  this.outputText = "";


  //make sure there is input data before converting...
  if (this.inputText.length > 0) {

    if (this.includeWhiteSpace) {
      this.newLine = "\n";
      // console.log("yes")
    } else {
      this.indent = "";
      this.newLine = "";
      // console.log("no")
    }

    CSVParser.resetLog();
    var parseOutput = CSVParser.parse(this.inputText, this.headersProvided, this.delimiter, this.downcaseHeaders, this.upcaseHeaders);

    var dataGrid = parseOutput.dataGrid;
    var headerNames = parseOutput.headerNames;
    var headerTypes = parseOutput.headerTypes;
    var errors = parseOutput.errors;

    this.outputText = DataGridRenderer[this.outputDataType](dataGrid, headerNames, headerTypes, this.indent, this.newLine);


    this.outputTextArea.val(errors + this.outputText);

  }; //end test for existence of input text
}


DataConverter.prototype.insertSampleData = function() {
  this.inputTextArea.val("DATE\tNARRATION\tLEDGERNAME\tLEDGERNAME\tAMOUNT\n01-02-2020\tAMOUNT PAID\tMOBILE EXP\tcash\t1552\n02-02-2020\tcash paid\tTA Expense\tcash\t5000\n01-03-2020\tAMOUNT PAID\tLOCAL CONV.\tcash\t6000\n02-03-2020\tAMOUNT PAID\tOM ENTERPRISES\tsbi\t500\n01-04-2020\tAMOUNT PAID\tOFFICE EXP.\tsbi\t1800");
}


