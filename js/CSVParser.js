
var isDecimal_re     = /^\s*(\+|-)?((\d+([,\.]\d+)?)|([,\.]\d+))\s*$/;

var CSVParser = {


  isNumber: function(string) {
    if( (string == null) || isNaN( new Number(string) ) ) {
      return false;
    }
    return true;
  },


  parse: function (input, headersIncluded, delimiterType, downcaseHeaders, upcaseHeaders, decimalSign) {

    var dataArray = [];

    var errors = [];


    var RE = new RegExp("[^,]", "gi");
    var numCommas = input.replace(RE, "").length;


    RE = new RegExp("[^\t]", "gi");
    var numTabs = input.replace(RE, "").length;

    var rowDelimiter = "\n";

    var columnDelimiter = ",";
    if (numTabs > numCommas) {
      columnDelimiter = "\t"
    };

    if (delimiterType === "comma") {
      columnDelimiter = ","
    } else if (delimiterType === "tab") {
      columnDelimiter = "\t"
    }



    RE = new RegExp("^" + rowDelimiter + "+", "gi");
    input = input.replace(RE, "");
    RE = new RegExp(rowDelimiter + "+$", "gi");
    input = input.replace(RE, "");


    dataArray = this.CSVToArray(input, columnDelimiter);

    for (var i = dataArray.length - 1; i >= 0; i--){
      for (var j = dataArray[i].length - 1; j >= 0; j--){
        dataArray[i][j] = dataArray[i][j].replace("\t", "\\t");
        dataArray[i][j] = dataArray[i][j].replace("\n", "\\n");
        dataArray[i][j] = dataArray[i][j].replace("\r", "\\r");
      };
    };


    var headerNames = [];
    var headerTypes = [];
    var numColumns = dataArray[0].length;
    var numRows = dataArray.length;
    if (headersIncluded) {


      headerNames = dataArray.splice(0,1)[0];
      numRows = dataArray.length;

    } else { 

     
      for (var i=0; i < numColumns; i++) {
        headerNames.push("val"+String(i));
        headerTypes.push("");
      };

    }


    if (upcaseHeaders) {
      for (var i = headerNames.length - 1; i >= 0; i--){
        headerNames[i] = headerNames[i].toUpperCase();
      };
    };
    if (downcaseHeaders) {
      for (var i = headerNames.length - 1; i >= 0; i--){
        headerNames[i] = headerNames[i].toLowerCase();
      };
    };

    //test all the rows for proper number of columns.
    for (var i=0; i < dataArray.length; i++) {
      var numValues = dataArray[i].length;
      if (numValues != numColumns) {this.log("Error parsing row "+String(i)+". Wrong number of columns.")};
    };

    //test columns for number data type
    var numRowsToTest = dataArray.length;
    var threshold = 0.9;
    for (var i=0; i < headerNames.length; i++) {
      var numFloats = 0;
      var numInts = 0;
      for (var r=0; r < numRowsToTest; r++) {
        if (dataArray[r]) {
          //replace comma with dot if comma is decimal separator
          if(decimalSign='comma' && isDecimal_re.test(dataArray[r][i])){
            dataArray[r][i] = dataArray[r][i].replace(",", ".");
          }
          if (CSVParser.isNumber(dataArray[r][i])) {
            numInts++
            if (String(dataArray[r][i]).indexOf(".") > 0) {
              numFloats++
            }
          };
        };

      };

      if ((numInts / numRowsToTest) > threshold){
        if (numFloats > 0) {
          headerTypes[i] = "float"
        } else {
          headerTypes[i] = "int"
        }
      } else {
        headerTypes[i] = "string"
      }
    }





    return {'dataGrid':dataArray, 'headerNames':headerNames, 'headerTypes':headerTypes, 'errors':this.getLog()}

  },


  //---------------------------------------
  // ERROR LOGGING
  //---------------------------------------
  errorLog:[],

  resetLog: function() {
    this.errorLog = [];
  },

  log: function(l) {
    this.errorLog.push(l);
  },

  getLog: function() {
    var out = "";
    if (this.errorLog.length > 0) {
      for (var i=0; i < this.errorLog.length; i++) {
        out += ("!!"+this.errorLog[i] + "!!\n");
      };
      out += "\n"
    };

    return out;
  },




    CSVToArray: function( strData, strDelimiter ){
     
      strDelimiter = (strDelimiter || ",");


      var objPattern = new RegExp(
        (
          // Delimiters.
          "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

          // Quoted fields.
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

          // Standard fields.
          "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


     
      var arrData = [[]];

      
      var arrMatches = null;

      while (arrMatches = objPattern.exec( strData )){

       
        var strMatchedDelimiter = arrMatches[ 1 ];

        if (
          strMatchedDelimiter.length &&
          (strMatchedDelimiter != strDelimiter)
          ){

   
          arrData.push( [] );

        }


       
        if (arrMatches[ 2 ]){

          var strMatchedValue = arrMatches[ 2 ].replace(
            new RegExp( "\"\"", "g" ),
            "\""
            );

        } else {


          var strMatchedValue = arrMatches[ 3 ];

        }


        arrData[ arrData.length - 1 ].push( strMatchedValue );
      }


      return( arrData );
    }



}