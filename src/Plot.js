import React from 'react';  
import wellio from 'wellio'; 
import wellioviz from 'wellioviz';  
import curveBoxTemplateExamples from './component/define_curveBoxTemplateExamples'; 
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'  

var holders = [];

export default class Plot extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      font_size_check: {
        well: true,
        curve: false,
        scale: false
      },
      font_displayClrPkr: false,
      back_displayClrPkr: false,
      font_size: '',
      font_panel_color: { r: '0', g: '0', b: '0', a: '1'},
      back_panel_color: { r: '255', g: '255', b: '255', a: '1'},
      font_color: {
        color: ''
      },
      back_color: {
        background: ''
      }, 
      all_files: [{
        plot_obj: { 
          jsonfile_object: {},
          uwi: '', 
          file_checked: false, 
          curves: [{
            name: '',
            color: '',
            checked: false
          }]
        }
      }], 
    };
  }; 
   
  font_onClick = () => {
    this.setState({ 
      font_displayClrPkr: !this.state.font_displayClrPkr 
    })     
  };
  back_onClick = () => {
    this.setState({ 
      back_displayClrPkr: !this.state.back_displayClrPkr 
    })
  }
  stateClose = () => {
    this.setState({ 
      font_displayClrPkr: false,
      back_displayClrPkr: false      
    })
  };

  font_onChange = (e) => {  
    this.setState({ 
      font_color: {
        color: e.hex
      },
      font_panel_color: {
        r: e.rgb.r,
        g: e.rgb.g,
        b: e.rgb.b,
        a: e.rgb.a,
      }
    })
  };
  fontChangeHandle = (e) => {
    var {font_size_check } = this.state;
    if(font_size_check.well){
      this.setState({
        font_size: e.target.value
      });
    }else if(font_size_check.scale) {
      var curve_scale = document.querySelectorAll(".svg_holder svg.header >g +text +text +text+g"); 
      for (var i = 0; i < curve_scale.length; i++ ){
        var ele = curve_scale[i]; 
        ele.style.fontSize = e.target.value + "px"; 
      } 
    }else {
      var title_ele = document.querySelectorAll(".svg_holder svg.header >g +text +text +text"); 
      for (var i = 0; i < title_ele.length; i++ ){
        var ele = title_ele[i]; 
        ele.style.fontSize = e.target.value + "px"; 
      } 
    } 
  };

  back_onChange = (e) => {  
    //this.props.back_color(e.hex);
    this.setState({ 
      back_color: {
        background: e.hex
      },
      back_panel_color: {
        r: e.rgb.r,
        g: e.rgb.g,
        b: e.rgb.b,
        a: e.rgb.a,
      }
    }) 
  };

  checkhandle = (e) => { 
    if(e.target.value == "curve") {
      this.setState({
        font_size_check: {
          curve: true,
          well: false,
          scale: false
        }
      })
    }else if(e.target.value == "scale") {
      this.setState({
        font_size_check: {
          well: false,
          curve: false,
          scale: true
        }
      })
    }else {
      this.setState({
        font_size_check: {
          scale: false,
          curve: false,
          well: true
        }
      })
    }
  }
  
  readInFilesFunction = (e) => {   
    var files = e.target.files;   
    if(files) {         
      if (files && files.length !== 0) {  
        for (var i = 0; i<files.length; i++) { 
          var file = files[i]; 
          var reader = new FileReader(); 
          let self = this;
          reader.onload = (function(file) {
            let that = self;
              return function(e) {
                var las_file = e.target.result;
                console.log(las_file, '888')
                var filename = file.name.replace(/.las/i, "");
                var search_curve = las_file.search(/curve information/i);
                var serarch_parameter = las_file.search(/parameter/i);
                if(search_curve == -1 || serarch_parameter == -1){
                  alert("File error")
                }else{
                  that.convert_and_startHelpers(las_file, filename); 
                } 
              };
          })(file);  
          reader.readAsText(file, "UTF-8");  
        }
      }    
    }     
  };  
  convert_and_startHelpers = (las_file, filename) => {   
    var temp_json = wellio.las2json(las_file);  
    var {all_files} = this.state;  
    const curves = temp_json.CURVES;  
    const curve_names = Object.keys(curves);  
    let elements = {};
    for(var i=0; i< curve_names.length; i++) {
      var element = curves[curve_names[i]]
       
      element = element.filter(item => parseInt(item) != -999) 

      var key = curve_names[i];  
      var obj_curves = {};
      obj_curves[key] = element;  
      elements = {...elements, ...obj_curves}
    };  
    temp_json.CURVES = elements
   
    var color  = {
      "SP":"#33ccff", "GR":"#666600", "CALI":"#cc6699", "BitSize":"#bf4080", "MSFL":"#cc6666", "LL8":"#d966ff", "ILM":"#730099", 
      "ILD":"#1a1aff", "NPHI":"#ccff33", "RHOB":"#99cc00", "DT":"#33ffcc", "MudWgt":"#85a3e0", "LLD":"#a3a375", "LLS":"#33ffad",
      "DEPT": "#4fffbc", "N": "#ccff33", "S": "#ff1a23", "NEUT": "#99ebff", "D":"#007a99", "PEF": "#003d4d", "FDC": "#1affd1", 
      "SNP":"#e60000", "CAL": "#668cff", "CNL":"#99b3ff", "NAPI":"#3366ff", "RHOC":"#000d33","DEPTH":"#0039e6","DENS":"#ffccff",
      "Neut":"#ff66ff","NEU":"#ff1aff","DPHI":"#4d004d", "NPRL":"#c68c53","GREQ":"#ff4da6","LATL":"#ff1a8c","LN":"#b380ff",
      "LAT":"#6600ff","SN":"#ff1aff","SDEV":"#8080ff","DPHZ":"#4ddbff","HCAL":"#ace600","HDRA":"#66b3ff","HLLS":"#66cc99",
      "HLLD":"#ff1a1a","PEFZ":"#e6ac00","RHOZ":"#0000cc","TENS":"#ff4dd2","DRHO":"#ff8c1a","GRDE":"#d966ff","CODE":"#4d79ff",
      "SONM":"#ff5c33","NPRS":"#cc6666","CADE":"#66b3ff","VSH":"#66ffe0",
    };  

    let curve_data = [];
    for(var i=0; i< curve_names.length; i++) {
      var curve_color = color[curve_names[i]]; 
      var obj = {name: curve_names[i], color: curve_color, checked: true }
      curve_data.push(obj);
    } 
 
    if(!temp_json["WELL INFORMATION BLOCK"]["UWI"] || temp_json["WELL INFORMATION BLOCK"]["UWI"]["DATA"] =="") {
      var uwi = "-155-20001"
    }else {
      uwi = temp_json["WELL INFORMATION BLOCK"]["UWI"]["DATA"]
    }
    let file_data = {"plot_obj": {"jsonfile_object" : temp_json,"uwi": uwi,  "file_checked": true, "curves" : curve_data, "filename": filename}};  
    all_files.push(file_data); 
    this.setState({  
      all_files: all_files,
    })  
    this.displayCurves( ); 
  };

  displayCurves = ( ) => {   
    var { all_files } = this.state;
    this.handlePlot(all_files.filter(item => item.plot_obj.uwi !=""));
  }; 
  
  handlePlot = (data) => {  
    if(data && data.length >= 1 ) { 
      var index_1 = -1;
      for(let i=0; i<data.length; i++) {  
        var one_lasfile_plot_data = []; 
        var uwi = data[i].plot_obj.uwi; 
        if(data[i].plot_obj.file_checked) { 
          var curves = data[i].plot_obj.curves.filter(item=> item.name !="M__DEPTH" && item.name !="DEPT" && item.name !="M_DEPTH" && item.name !="DEPTH");
         
          var jsonfile_object = data[i].plot_obj.jsonfile_object; 
          var depth_curve_name = wellioviz.findDepthName(jsonfile_object);   
          if(curves && curves.length !=0) {  
            for(let j=0; j<curves.length; j++) {              
              if(curves[j].checked) {
                var three_things_2 = wellioviz.fromJSONofWEllGetThingsForPlotting(jsonfile_object, depth_curve_name); 
                var well_log_curves_reformatted_for_d3_2 = three_things_2["well_log_curves_reformatted_for_d3"]; 
                var example_template = curveBoxTemplateExamples("example");  
                var poro_plot_template_1 = wellioviz.minimumDataIntoTemplateFunc(example_template,well_log_curves_reformatted_for_d3_2,[uwi],
                  [curves[j].name],[curves[j].color],[""],[ ],"dddd", 120, 500, depth_curve_name);  
                  one_lasfile_plot_data.push(poro_plot_template_1);  
              }
            } 
          }  
        }
        index_1++;
      }       
      var result_1 = wellioviz.multipleLogPlot("well_holder" + (index_1), one_lasfile_plot_data); 
      this.selectfunc(index_1); 
    } 
  }; 

  selectfunc = (index_1) => {
    var title_ele = document.querySelectorAll("#well_holder" + (index_1) + " .svg_holder svg.header >g +text +text +text");  
    for (var i = 0; i < title_ele.length; i++ ){
      var ele = title_ele[i]; 
      var text = ele.innerHTML.replace(/ /g,'');
      text = text.replace(/--/g,'-');
      var text_arr = text.split("-");
      var title = text_arr[text_arr.length - 2];
      ele.innerHTML = title; 
      ele.parentElement.parentElement.parentElement.setAttribute("dataname", title )
      ele.parentElement.parentElement.parentElement.setAttribute("class", "subitem sub" + title )
    } 
    var depth_scale = document.querySelector("#well_holder" + (index_1) + " .component_outter .component_inner svg.components > g:first-child"); 
    depth_scale.style.setProperty("opacity", "1", "important");  


   
    var depth_name = document.querySelector("#well_holder" + (index_1) + " .component_outter .component_inner svg.components > g:first-child > text"); 
    depth_name.style.opacity = "0";

    // var depth_name = document.querySelectorAll("#well_holder" + (index_1) + " .component_outter .component_inner svg.components > g:first-child > text");
    
    // for(var i =0; i < depth_name.length; i++) {
    //   var name = depth_name[i];
    //   name.style.opacity = "0";
    // } 
  }

  log_handleCheck = (e) => { 
    var selected_item = e.target.value;     
    var { all_files } = this.state;
    if(all_files && all_files.length > 1 ) {
      all_files.forEach(onefile => {
        if(onefile.plot_obj.file_checked) {
          if(e.target.checked) {
            onefile.plot_obj.curves.forEach(item => {
              if(selected_item == item.name) {
                item.checked = true;
              }
            })      
          }else {
            onefile.plot_obj.curves.forEach(item => {
              if(selected_item == item.name) {
                item.checked = false;
              }
            }) 
          }           
        }   
        this.setState({
          plot_obj: {
            uwi: onefile.plot_obj.uwi,
            jsonfile_object: onefile.plot_obj.jsonfile_object,
            file_checked: onefile.plot_obj.file_checked,
            curves: [...onefile.plot_obj.curves]
          }
        })        
      })
    }    
    var title = e.target.value 
    var els = document.querySelectorAll(".subitem.sub" + title);
    for (var i = 0; i < els.length; i++ ){
      var ele = els[i]
      if (e.target.checked ){
        ele.style.display = "inline-block";
      }else{
        ele.style.display = "none";
      }
    }

    var parents = document.querySelectorAll("#well_holder .holder > div");
    
    for(var i = 0; i < parents.length; i++ ){
      var flag = true;
      var item = parents[i];
      var sub_items = item.querySelectorAll(".subitem");

      for (var j = 0; j < sub_items.length; j++ ){
        var sub_item = sub_items[j];
        var sub_item_display = sub_item.style.display;
        var rule_item = sub_item.querySelectorAll(".component_outter svg.components g:first-child");
        rule_item = rule_item[0];

        if (flag && sub_item_display.indexOf("inline-block") > -1 ){
          rule_item.style.setProperty("opacity", "1", "important");  
          flag = false;
        }else{
          rule_item.style.setProperty("opacity", "0", "important");
        }
      }
    }

  };

  well_handleCheck = (e) => {
    var selecete_well = e.target.value;
    var { all_files } = this.state; 
    if(e.target.checked) {
      all_files.forEach(item => {
        if(selecete_well == item.plot_obj.uwi) { 
          item.plot_obj.file_checked = true;
          this.setState({
            plot_obj: {
              jsonfile_object: item.plot_obj.jsonfile_object,
              uwi: item.plot_obj.uwi,              
              file_checked: true,
              curves: item.plot_obj.curves
            }
          }) 
        }        
      })
    }else {
      all_files.forEach(item => {
        if(selecete_well == item.plot_obj.uwi) { 
          item.plot_obj.file_checked = false;
          this.setState({
            plot_obj: {
              jsonfile_object: item.plot_obj.jsonfile_object,
              uwi: item.plot_obj.uwi,              
              file_checked: true,
              curves: item.plot_obj.curves
            }
          })
        }
      })      
    }   
    var check_index = e.target.getAttribute("dataind"); 
    if (e.target.checked ){
      document.getElementById("well_holder" + check_index ).parentElement.style.display = "block"
    }else{
      document.getElementById("well_holder" + check_index ).parentElement.style.display = "none"
    } 
  };


  render() { 
    const styles = reactCSS({
      'default': {
        font_panel_color: {
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          background: `rgba(${ this.state.font_panel_color.r }, ${ this.state.font_panel_color.g }, ${ this.state.font_panel_color.b }, ${ this.state.font_panel_color.a })`,
        },
        back_panel_color: {
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          background: `rgba(${ this.state.back_panel_color.r }, ${ this.state.back_panel_color.g }, ${ this.state.back_panel_color.b }, ${ this.state.back_panel_color.a })`,       
        },
        popover: {
          position: '',
          zIndex: '',
        },
        cover: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
          position: 'fixed',            
        },
        swatch: {
          padding: '5px',
          background: '#ffffff',
          borderRadius: '3px',
          cursor: 'pointer',
          display: 'inline-block',
          boxShadow: '0 0 0 2px rgba(0,0,0,.3)',
        },          
      },
    });
    
    var { all_files, font_color, back_color, font_size, loading, font_size_check } = this.state;   
    var temp = [];   

    const result = all_files.filter(onefile => onefile.plot_obj.uwi != "");  
    
    result.map(onefile => {
      temp.push(onefile.plot_obj.curves);  
    })  
    temp = temp.flat(); 
    const filteredArr = temp.reduce((acc, current) => {
      const x = acc.find(item => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);  
    var curves_array = filteredArr.filter(item => item.name != "M__DEPTH") || filteredArr.filter(item => item.name != "DEPT") || filteredArr.filter(item => item.name != "DEPTH");
  
    return (
      <div>    
        <div className="row">
          <div className="col-md-2">
            <div className="well-check-div">
              <div>
                <p className="setting-label" >Well:</p>
                <div className="log-check"></div>
              </div>
              <div className="well-check">
                {result && result.length !=0 ? result.map((item, index) => {
                  return <div key={index}>
                    <label className="well-label">{item.plot_obj.filename}</label>
                    <input 
                      className="checkbox"  
                      defaultChecked= {item.plot_obj.file_checked}                    
                      type="checkbox"
                      dataind = {index}
                      value = {item.plot_obj.uwi}
                      onChange={(e) => this.well_handleCheck(e)}
                    />   
                  </div> 
                }): ""}                
              </div> 
            </div> 
            <div className="log-check-div">
              <div>
                <p className="setting-label">Log:</p>
                <div className="log-check"></div>
              </div>
              <div className="log-check">
                {curves_array && curves_array.length > 1 ? curves_array.map((item, index) => { 
                  return <div key={index}>
                    <label className="">{item.name}</label>
                    <input    
                      className = "checkbox"
                      value= {item.name} 
                      defaultChecked = {item.checked}                   
                      type="checkbox"
                      onChange={(e) => this.log_handleCheck(e)}
                    />   
                    </div>  
                }) : ""}
              </div>
            </div>            
            <div className="setting-div">
              <p className="setting-label">Setting</p> 
              <div>
                <p className="well-name-label">Font Size</p> 
                <div className="check-control">
                  <div>
                    <input type="radio" id="well" value="well" name="well" onClick={(e) => this.checkhandle(e)} defaultChecked={font_size_check.well}/>
                    <label htmlFor="well">Well</label>
                  </div>
                  <div>
                    <input type="radio" id="curve" value="curve" name="curve" onClick={(e) => this.checkhandle(e)} defaultChecked={font_size_check.curve}/>
                    <label htmlFor="curve">Curve</label>
                  </div>
                  <div>
                    <input type="radio" id="scale" value="scale" name="scale" onClick={(e) => this.checkhandle(e)} defaultChecked={font_size_check.scale}/>
                    <label htmlFor="scale">Scale</label>
                  </div>
                </div> 
                <div>
                  <input 
                    type="range" 
                    id="volume" 
                    name="volume"
                    min="0" 
                    max="30" 
                    step="1" 
                    defaultValue="15"
                    onChange = {(e) => this.fontChangeHandle(e)}
                  /> 
                </div>       
              </div> 
              <div>
                <p className="background-label">Color</p> 
                 <div className="font-color"> 
                    <label className="font-color">Font Color</label>
                    <div style={ styles.swatch } onClick={ () => this.font_onClick() }>
                      <div style={ styles.font_panel_color } />
                      </div>
                      { this.state.font_displayClrPkr ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ () => this.stateClose() }/>
                        <SketchPicker color={ font_color } onChange={ (e) => this.font_onChange(e) } name="font"/>
                    </div> : null } 
                  </div>
                <div className="background-color">
                  <label className="background-color">Background color</label>
                  <div style={ styles.swatch } onClick={ () => this.back_onClick() } >
                    <div style={ styles.back_panel_color } />
                    </div>
                    { this.state.back_displayClrPkr ? <div style={ styles.popover }>
                      <div style={ styles.cover } onClick={ () => this.stateClose() }/>
                      <SketchPicker color={ back_color } onChange={ (e)=> this.back_onChange(e) } name="background"/>
                  </div> : null }
                </div>
              </div>  
            </div>
          </div>
          <div className="col-md-10 plot-region" > 
            <div className="file-input"> 
              <input    
                  id="actual-btn" 
                  type="file"
                  accept = ".las"
                  onChange={(e) => this.readInFilesFunction(e)}
                  multiple
              />
              <label htmlFor="actual-btn" className="file-input-label">Choose File</label>
            </div> 
            <div id="well_holder" style = {back_color}> 
                {result.map((value, index)=> {  
                    return <div key={index} className = "holder"> 
                      {value.plot_obj.file_checked ? <label style={{color:font_color.color ,fontSize: font_size + "px"}} className="well-name">{value.plot_obj.filename} </label> : ""}
                      <div id={"well_holder" + index} style={back_color}></div>
                    </div> 
                })} 
            </div>
          </div>
        </div>                 
      </div>
    );
  }  
}
 