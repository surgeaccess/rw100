
$(window).load(function(){ getCommands(); })

var wearMLElements = [];

function getCommands() {
   var elements = getAllElementsWithAttribute('data-wml');
   createOverrideDom();

   // Give the document focus
   window.focus();

   // Remove focus from any focused element
   if (document.activeElement) {
       document.activeElement.blur();
   }
}

/**
*  Get all elements based on attribute passed
**/
function getAllElementsWithAttribute(attribute)
{
  var allElements = document.body.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(attribute) !== null)
    {
        var command = allElements[i].getAttribute(attribute);

        if(allElements[i].id === ""){
            allElements[i].id = guid();
        }
        var position = getPosition(allElements[i]);
        var element = {tag: command, id: allElements[i].id,x: position.x, y: position.y };
      // Element exists with attribute. Add to array.
        wearMLElements.push(element);
    }
  }
  return wearMLElements;
}

/**
*   Creates a DOM element to contain all the custom xml
**/
function createOverrideDom(){
    // Lets make sure its not already made
    var btn = document.createElement("BUTTON");        // Create a <button> element

    var t = document.createTextNode("wearhf_override:" + generateXML());       // Create a text node
    btn.appendChild(t);                                // Append the text to <button>
    btn.style.top = 0;
    btn.style.left = 0;
    btn.style.position = "absolute";
    btn.style.opacity  = "0.0";
    // Get a reference to the first child
    var theFirstChild = document.body.firstChild;
   // document.body.appendChild(btn);
   document.body.insertBefore(btn, theFirstChild);
}


/**
*  Create xml for web page.
**/
function generateXML(){
  var xml = "<WearML><Package>com.android.webview</Package><Language>en_UK</Language><UniqueIdentifier id=\"web_app\"/> ";

  for (var i = 0, n = wearMLElements.length; i < n; i++)
  {
      var res = wearMLElements[i].tag.split("|");
      xml += "<View ";
      xml += "id=\"" + wearMLElements[i].id + "\" ";

      for (var p = 0, m = res.length; p < m; p++)
      {
         xml += wearMLParser(res[p], wearMLElements[i]);
      }

      xml += "xy=\"" + wearMLElements[i].x + "," + wearMLElements[i].y + "\"";

      xml += "/> ";
  }

   xml += "</WearML>";
   return window.btoa(xml);
}

/**
*   Create Random GUID
**/
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function getPosition(e) {
    var isNotFirefox = (navigator.userAgent.toLowerCase().indexOf('firefox') == -1);
    var x = 0, y = 0;
    while (e) {
        x += e.offsetLeft - e.scrollLeft + (isNotFirefox ? e.clientLeft : 0);
        y += e.offsetTop - e.scrollTop + (isNotFirefox ? e.clientTop : 0);
        e = e.offsetParent;
    }
    return { x: x + window.scrollX, y: y + window.scrollY };
}


/**
*    Convert String to xml attribute
**/
function wearMLParser(e, element) {
    /**
        Show Number
    **/
    if(e.includes("overlay_show_number_no")){
        return "overlay_show_number=\"no\" ";
    }
    if(e.includes("overlay_show_number_yes")){
            return "overlay_show_number=\"yes\" ";
    }

    /**
        Show Text
    **/
    if(e.includes("overlay_show_text_yes")){
          return "overlay_show_text=\"yes\" ";
    }
    if(e.includes("overlay_show_text_no")){
          return "overlay_show_text=\"no\" ";
    }

    /**
        Show Overlay
    **/
    if(e.includes("overlay_persists_yes")){
              return "overlay_persists=\"yes\" ";
    }
     if(e.includes("overlay_persists_no")){
              return "overlay_persists=\"no\" ";
    }

    /**
        Overlay Orientation
    **/
    if(e.includes("overlay_orientation_bottom")){
            return "overlay_orientation=\"bottom\" ";
    }
    if(e.includes("overlay_orientation_left")){
           return "overlay_orientation=\"left\" ";
    }
    if(e.includes("overlay_orientation_right")){
           return "overlay_orientation=\"right\" ";
    }
    if(e.includes("overlay_orientation_top")){
           return "overlay_orientation=\"top\" ";
    }

    /**
        Global Commands
    **/
    if(e.includes("global_commands_yes")){
        return "global_commands=\"yes\" ";
    }
    if(e.includes("global_commands_no")){
         return "global_commands=\"no\" ";
    }

    /**
        Broadcast Commands
    **/
    if(e.includes("broadcast_results_yes")){
         return "broadcast_results=\"yes\" ";
    }

    /**
        Text Field Type
    **/
    if(e.includes("text_field_dictation")){
         return "text_field=\"dictation\" ";
    }
    if(e.includes("text_field_keyboard")){
          return "text_field=\"keyboard\" ";
    }
    if(e.includes("text_field_barcode")){
         return "text_field=\"barcode\" ";
    }

    /**
        Barcode Field Type
    **/
    if(e.includes("barcode_any")){
         return "barcode=\"any\" ";
    }
    if(e.includes("barcode_qr")){
          return "barcode=\"qr\" ";
    }
    if(e.includes("barcode_code128")){
         return "barcode=\"code128\" ";
    }
    if(e.includes("barcode_upc")){
          return "barcode=\"upc\" ";
    }
    if(e.includes("barcode_ean")){
          return "barcode=\"ean\" ";
    }

    if(e.includes("hf_scroll_none")){
           return "scroll=\"none\" ";
    }

    return "speech_command=\"" + e + "\"";
}

