# Synopsis
This repository contains an example Android Application containing html web pages which are customised to use WearML attributes to control WearHF's speech overlay system.

## Before/After
![alt text](/images/example_1.png)

## Approach

The general approach relies on the use of JavaScript as a middle language, bridging the HMT-1 web browser and the underlying WearHF speech engine.
Once the javascript file is included into the webpage WearML tags can be freely embedded into the webpage. These tags will provide hints to the speech engine, determining what should be speech enabled, and as importantly, what should not be speech enabled.

WearML gives the developer greater control over the user interface of a webpage – additional captions or hints can be overlaid onto any webpage, with a great deal of artistic control, to indicate to the user which controls are speech enabled.
All of the WearML tags will be skipped by regular browsers, but read in by the HMT-1 browser.
In this way, production webpages (or HTML5 apps) can be built for all platforms including HMT-1.

# Example

## CSS
```css
        .rootLayout{
            --root:true;
            --hf_scroll:"none";
            --overlay_show_number:false;
        }
        .nativeSpeechRightAligned{
            --overlay_show_number:false;
            --overlay_show_dot:true;
            --overlay_persists:true;
            --overlay_anchor_hv:"110,50";
        }
        .nativeSpeechLeftAligned{
            --overlay_show_number:false;
            --overlay_show_dot:true;
            --overlay_persists:true;
            --overlay_anchor_hv:"0,50";
        }
        .microphoneOverlay{
            --overlay_background_color: "#e9e9e9";
            --overlay_text_color: "#000000";
            --overlay_border_color: "#000000";
            --overlay_show_dot:true;
            --overlay_persists:true;
            --overlay_anchor_hv:"100,50";
        }
```
## HTML

```html
<script type="text/javascript" src="js/wearml_engine.js"></script>
<body id="p_test">
<div id="app">
    <div class="container test-form" data-wml-style=".rootLayout" >
        <div class="row">
            <div class="col-sm-offset-3 col-sm-6">
                <img class="test-logo" src="http://configure.realwear.com/img/logo_horiz_black.png"/>
                <p>Hands-free head mounted tablet solutions.</p>
                <hr/>
                <p>
                    <b>New?</b> <a href="signup.html" data-wml-style=".nativeSpeechRightAligned">Sign Up</a>
                </p>

                <div class="form-group">
                    <input data-wml-style=".microphoneOverlay" data-wml-speech-command="Enter Username"
                           class="form-control" type="text" placeholder="Username">
                </div>
                <div class="form-group">
                    <input data-wml-style=".microphoneOverlay" data-wml-speech-command="Enter Password"
                           class="form-control" type="password" placeholder="Password">
                </div>
                <div class="form-group">
                    <a data-wml-style=".nativeSpeechLeftAligned" data-wml-speech-command="Login" href="/test/buttons"
                       class="btn btn-primary">Login</a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
```
# API Reference

## DOM Attribute
|  Attribute | Description |
| --- | --- |
data-wml-speech-command  | String  | text|content_description|no|xxxx	Optional: Defines the source for the speech command. text will take the text attribute from the component. content_description will use that attribute from the component. no will turn the voice command off on the component all together. xxxx You are also able to provide a custom voice command here, e.g. xxxx
data-wml-style  | String  |	Optional: References to a CSS style using the classname.

## CSS Attribute
| Attribute | DataType | Description |
| --- | --- | --- |
--root  | Boolean  | All elements below this will inherit the attributes provided to this dom tag unless otherwise specified. 
--overlay_show_text   | Boolean  | Optional: Turns a text label on or off. Text on the label will be taken from the speech_command that is set. (default = no)
--overlay_persists  | Boolean  |	Optional: Number and/or overlay won’t fade away. (default = no, fades away)
--overlay_orientation  | String  |	left,right,top,bottom	Optional: Text overlay direction (default = right)
--overlay_background_color  | String | Optional: Changes the background color of the element String is represented as HEX
--overlay_text_color  | tring | Optional: Changes the background color of the element String is represented as HEX
--overlay_border_color  | String | Optional: Changes the background color of the element String is represented as HEX
--overlay_anchor_hv  | String as "H,V" | Optional: Changes the background color of the element”	Optional: Sets the anchor point horizontally and vertically, specified as a percentage. 0 means anchor to left,top  edge of element. 100 means anchor to right,bottom edge of element. 50 means anchor to middle of element.
--overlay_show_dot | Boolean  | Optional: Turns purple dot icon on or off for the element. Off by default
--overlay_show_icon | Boolean  |Optional: Turns microphone icon on or off for the element. On by default if there is a text overlay
--hf_scroll | String | "None" = switches off headtracker "Horizontal" = Headtracker only works horizontally "Vertical" = Headtracker only work vertically
--text_field | String | "Dictation keyboard will open in dictation mode "keyboard" = default keyboard "barcode" barcode reader will open | Optional: On text field elements this will indicate what keyboard should be opened.
--barcode | String | any, qr , code128, up, cean | Optional: Will define which type of barcode is being scanned. Ignored if the text_field isn’t set to barcde. (default = any)
--global_commands  | Boolean  | Optional: Disables all global commands and hides show help, doesn’t matter which component it is applied to. 
--broadcast_results  | Boolean  | Optional: Broadcast ASR results via separate intent com.realwear.wearhf.intent.action.SPEECH_EVENT, including confidence scores. (default = no)
