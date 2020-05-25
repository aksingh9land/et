

var DataGridRenderer = {
  
 
  //---------------------------------------
  // XML - Tally Receipt
  //---------------------------------------
  xmlR: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "<!--";
    var commentLineEnd = "-->";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    //begin render loop
    outputText = '<?xml version="1.0" encoding="UTF-8"?>' + newLine;
	outputText += "<ENVELOPE>"+newLine;
	outputText += "<HEADER>"+newLine;
	outputText += "<TALLYREQUEST>Import Data</TALLYREQUEST>"+newLine;
	outputText += "</HEADER>"+newLine;
	outputText += "<BODY>"+newLine;
	outputText += "<IMPORTDATA>"+newLine;
	outputText += "<REQUESTDESC>"+newLine;
	outputText += "<REPORTNAME>Vouchers</REPORTNAME>"+newLine;
	outputText += "<STATICVARIABLES>"+newLine;
    outputText += "<SVCURRENTCOMPANY>LearnWell</SVCURRENTCOMPANY>"+newLine;
	outputText += "</STATICVARIABLES>"+newLine;
	outputText += "</REQUESTDESC>"+newLine;
	outputText += "<REQUESTDATA>"+newLine;
	for (var i=0; i < numColumns;i++) 
	for (var j=0; j < numRows; j++) {
      var row = dataGrid[j];
	  outputText += indent+'<TALLYMESSAGE xmlns:UDF="TallyUDF">'+newLine;
	  outputText += indent+'<VOUCHER REMOTEID="" VCHTYPE="Receipt" ACTION="Create">'+newLine;
	  outputText += indent+"<VOUCHERTYPENAME>Receipt</VOUCHERTYPENAME>"+newLine;
	  outputText += indent+"<GUID></GUID>"+newLine;
	  outputText += indent+"<ALTERID></ALTERID>"+newLine;
	  outputText += indent+"<DATE>"+row[0]+"</DATE>"+newLine; 
	  outputText += indent+"<EFFECTIVEDATE>"+row[0]+"</EFFECTIVEDATE>"+newLine; 
	  outputText += indent+"<NARRATION>"+row[1]+"</NARRATION>"+newLine;
	    outputText += indent+indent+"<ALLLEDGERENTRIES.LIST>"+newLine;  
		outputText += indent+indent+"<REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>"+newLine;  
		outputText += indent+indent+"<ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>"+newLine; 
		outputText += indent+indent+"<LEDGERNAME>"+row[2]+"</LEDGERNAME>"+newLine; 
		outputText += indent+indent+"<AMOUNT>"+row[4]+"</AMOUNT>"+newLine; 
		outputText += indent+indent+"</ALLLEDGERENTRIES.LIST>"+newLine;  
		outputText += indent+indent+"<ALLLEDGERENTRIES.LIST>"+newLine;  
		outputText += indent+indent+"<REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>"+newLine;  
		outputText += indent+indent+"<ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>"+newLine; 
		outputText += indent+indent+"<LEDGERNAME>"+row[3]+"</LEDGERNAME>"+newLine; 
		outputText += indent+indent+"<AMOUNT>-"+row[4]+"</AMOUNT>"+newLine; 
		outputText += indent+indent+"</ALLLEDGERENTRIES.LIST>"+newLine;  
      outputText += indent+"</VOUCHER>"+newLine;
	  outputText += indent+"</TALLYMESSAGE>"+newLine;
    };
    outputText += "</REQUESTDATA>"+newLine;
	outputText += "</IMPORTDATA>"+newLine;
	outputText += "</BODY>"+newLine;
	outputText += "</ENVELOPE>";
    
    return outputText;
    
  },
  
  
  
  //---------------------------------------
  // XML - Tally Payment
  //---------------------------------------
  xmlP: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "<!--";
    var commentLineEnd = "-->";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    //begin render loop
    outputText = '<?xml version="1.0" encoding="UTF-8"?>' + newLine;
	outputText += "<ENVELOPE>"+newLine;
	outputText += "<HEADER>"+newLine;
	outputText += "<TALLYREQUEST>Import Data</TALLYREQUEST>"+newLine;
	outputText += "</HEADER>"+newLine;
	outputText += "<BODY>"+newLine;
	outputText += "<IMPORTDATA>"+newLine;
	outputText += "<REQUESTDESC>"+newLine;
	outputText += "<REPORTNAME>Vouchers</REPORTNAME>"+newLine;
	outputText += "<STATICVARIABLES>"+newLine;
    outputText += "<SVCURRENTCOMPANY>LearnWell</SVCURRENTCOMPANY>"+newLine;
	outputText += "</STATICVARIABLES>"+newLine;
	outputText += "</REQUESTDESC>"+newLine;
	outputText += "<REQUESTDATA>"+newLine;
	for (var i=0; i < numColumns;i++)
	for (var j=0; j < numRows; j++) {
	  var row = dataGrid[j];
	  
	  outputText += indent+'<TALLYMESSAGE xmlns:UDF="TallyUDF">'+newLine;
	  outputText += indent+'<VOUCHER REMOTEID="" VCHTYPE="Payment" ACTION="Create">'+newLine;
	  outputText += indent+"<VOUCHERTYPENAME>Payment</VOUCHERTYPENAME>"+newLine;
	  outputText += indent+"<GUID></GUID>"+newLine;
	  outputText += indent+"<ALTERID></ALTERID>"+newLine;
	  outputText += indent+"<DATE>"+row[0]+"</DATE>"+newLine; 
	  outputText += indent+"<EFFECTIVEDATE>"+row[0]+"</EFFECTIVEDATE>"+newLine; 
	  outputText += indent+"<NARRATION>"+row[1]+"</NARRATION>"+newLine;
	    outputText += indent+indent+"<ALLLEDGERENTRIES.LIST>"+newLine;  
		outputText += indent+indent+"<REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>"+newLine;  
		outputText += indent+indent+"<ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>"+newLine; 
		outputText += indent+indent+"<LEDGERNAME>"+row[2]+"</LEDGERNAME>"+newLine; 
		outputText += indent+indent+"<AMOUNT>-"+row[4]+"</AMOUNT>"+newLine; 
		outputText += indent+indent+"</ALLLEDGERENTRIES.LIST>"+newLine;  
		outputText += indent+indent+"<ALLLEDGERENTRIES.LIST>"+newLine;  
		outputText += indent+indent+"<REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>"+newLine;  
		outputText += indent+indent+"<ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>"+newLine; 
		outputText += indent+indent+"<LEDGERNAME>"+row[3]+"</LEDGERNAME>"+newLine; 
		outputText += indent+indent+"<AMOUNT>"+row[4]+"</AMOUNT>"+newLine; 
		outputText += indent+indent+"</ALLLEDGERENTRIES.LIST>"+newLine;  
      outputText += indent+"</VOUCHER>"+newLine;
	  outputText += indent+"</TALLYMESSAGE>"+newLine;
    };
    outputText += "</REQUESTDATA>"+newLine;
	outputText += "</IMPORTDATA>"+newLine;
	outputText += "</BODY>"+newLine;
	outputText += "</ENVELOPE>";
    
    return outputText;
    
  },
  
  
  
  
  //---------------------------------------
  // XML properties
  //---------------------------------------
  xmlProperties: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "<!--";
    var commentLineEnd = "-->";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
  
    //begin render loop
    outputText = '<?xml version="1.0" encoding="UTF-8"?>' + newLine;
    outputText += "<rows>"+newLine;
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      outputText += indent+"<row ";
      for (var j=0; j < numColumns; j++) {
        outputText += headerNames[j]+'=';          
        outputText += '"' + row[j] + '" ';
      };
      outputText += "></row>"+newLine;
    };
    outputText += "</rows>";
    
    return outputText;
    
  },
  
   
}