function getOValue(objname) {
  var obj = document.getElementById(objname);
  if (obj.type=='checkbox'){
    if (obj.checked) { return 'on';  } else { return 'off'; }
  } else {
    return document.getElementById(objname).value;   
  }
 
}


function postData(url,data, callback) {
    $.ajax(url, {
        type: 'POST',
        contentType: 'application/json',
        dataType:'json',
        data: JSON.stringify(data),
        cache:false,
        
        success: function(data, textStatus, jqXHR) {
          var obj = jQuery.parseJSON(jqXHR.responseText);
          callback(obj);          
        },
        error  : function() { if ( callback ) callback(undefined); }
    });
}
