export default function curveBoxTemplateExamples(string_of_either__help_example_definitions_mandatories) {
    let request_string = string_of_either__help_example_definitions_mandatories; 
    if (request_string == "example") {
        return [{
            "curve_box": {
                "show_well_name": "yes", /// not built yet
                "show_depth_type": "yes", /// not built yet
                "show_curve_units": "no", /// not built yet
                "curve_box_depth_min": -100000, /// not built yet
                "curve_box_depth_max": 1000000, /// not built yet
                "take_out_null_or_visualize": "no", /// not built yet
                "show_title": "yes",
                "width": 100,
                "height": 200,
                "height_multiplier_components": 2,
                "margin": {"top": 10, "right": 2, "bottom": 30, "left": 40},
                "title": {"text": "", "title_font_size": "30px"}, /// not built yet
                "div_id": "well_holder_3", /// Should be skip-able // default=random str? What happens if div doesn't exist?
                "order_of_component": ["curves", "rectanges", "lines"], /// not built yet
                "lines_connected_across_curveboxes": "no", /// not built yet
                "header_sep_svg_or_not": "yes",
                "svg_header_height": "8em",
                "gridlines": "yes",
                "gridlines_color": "#D3D3D3",
                "gridlines_stroke_width": 0.10,
                "grouped_or_independent_x_scales": "independent",
                //// variables for how to draw mouseover of hover box
                "mouseover_yes_or_no": "yes", //// "yes" or "no"
                "mouseover_depth_or_depth_and_curve": "depth_and_curve", /// options= "depth_and_curve", "depth", or "curve"
                "mouseover_curvename": "default", //// default is first curve
                "mouseover_color_or_default_which_is_curve_color": "default" /// default is default, which then uses curve color or black
            },
            "components": [{
                "curves": [
                    {
                        "data_type": "curve",
                        "curve_names": ["RHOB"],
                        "curve_colors": ["black"],
                        "curve_stroke_dasharray": ["solid"],
                        "stroke_linecap": [""],
                        "stroke_width": [1],
                        "fill": [
                            {
                                "curve_name": "RHOB",
                                "fill": "yes",
                                "fill_direction": "left",
                                "cutoffs": [0.21, 2.23, 2.24],
                                "fill_colors": ["gray", "beige", "white"],
                                "curve2": ""
                            }
                        ],
                        "curve_units": ["g/cm3"],
                        "depth_limits": [{"min": "autocalculate", "max": "autocalculate"}],
                        "curve_limits": [{"curve_name": "SP", "min": -10000000, "max": 3}], 
                        "data": [{"depth": 1598.3, "RHOB": 2.2322}, {
                                    "depth": 1598.4,
                                    "RHOB": 2.0513
                                }, {"depth": 1598.5, "RHOB": 2.2548}, {
                                    "depth": 1598.6,
                                    "RHOB": 2.9445
                                }, {"depth": 1598.7, "RHOB": 2.2223}, {
                                    "depth": 1598.8,
                                    "RHOB": 2.447
                                }, {"depth": 1598.9, "RHOB": 2.598}, {"depth": 1599, "RHOB": 2.8088}, {
                                    "depth": 1599.1,
                                    "RHOB": 2.2248
                                }, {"depth": 1599.2, "RHOB": 2.2399}, {
                                    "depth": 1599.3,
                                    "RHOB": 2.251
                                }, {"depth": 1599.4, "RHOB": 2.255}, {
                                    "depth": 1599.5,
                                    "RHOB": 2.2526
                                }, {"depth": 1599.6, "RHOB": 2.2322}, {
                                    "depth": 1599.7,
                                    "RHOB": 2.2513
                                }, {"depth": 1599.8, "RHOB": 2.2548}, {"depth": 1599.9, "RHOB": 2.2445}, {
                                    "depth": 1600,
                                    "RHOB": 2.2223
                                }, {"depth": 1600.1, "RHOB": 2.2047}, {"depth": 1600.2, "RHOB": 2.198}],
                        "depth_curve_name": "DEPT",/// not built yet
                        //////
                        "data_id": ["placeholder_data_id",], /// not built yet
                        "well_names": [""], /// not built yet
                        "scale_linear_log_or_yours": ["linear"],
                        "line_color": [""], /// not built yet
                        "max_depth": "autocalculate", /// not built yet
                        "min_depth": "autocalculate", /// not built yet
                        "depth_type_string": [""],
                        "depth_units_string": [""],
                        "null_value": ["NULL"], /// not built yet
                    }
                ],
                "lines": [
                    {
                        "data_type": "line",  /// not built yet
                        "label": "",  /// not built yet
                        "depth": -999, /// not built yet
                        "color": "", /// not built yet
                        "stroke_width": "3px", /// not built yet
                        "stroke_style": "solid", /// not built yet
                        "transparency": 1.0, /// not built yet
                        "stroke_linecap": "butt"
                    }
                ],
                "rectangles": [
                    {
                        "data_type": "rectangle",
                        "depth_top": 0,
                        "x_starting_upper_left_corner": 0,
                        "width": 0,
                        "height": 0,
                        "stroke_width": "2px",
                        "stroke_linecap": "butt",
                        "fill": "red",
                        "opacity": 0.5,
                        "label": "", // not built into plotting template yet
                        "label_orientation": "horizontal", // not built into plotting template yet
                        "lable_position": "right" // not built into plotting template yet
                    }
                ]
            }]
        }];
    }  
}
