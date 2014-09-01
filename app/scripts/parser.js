var parser = function(input, startRule) {
  var parseFunctions = {
    "start": parse_start,
    "header": parse_header,
    "reference_number": parse_reference_number,
    "title": parse_title,
    "other_fields": parse_other_fields,
    "tempo": parse_tempo,
    "meter": parse_meter,
    "meter_fraction": parse_meter_fraction,
    "note_length_strict": parse_note_length_strict,
    "note_length": parse_note_length,
    "parts": parse_parts,
    "part_spec": parse_part_spec,
    "part": parse_part,
    "key": parse_key,
    "key_def": parse_key_def,
    "key_spec": parse_key_spec,
    "keynote": parse_keynote,
    "key_accidental": parse_key_accidental,
    "mode_spec": parse_mode_spec,
    "mode": parse_mode,
    "extratext": parse_extratext,
    "global_accidental": parse_global_accidental,
    "mode_minor": parse_mode_minor,
    "mode_major": parse_mode_major,
    "mode_lydian": parse_mode_lydian,
    "mode_ionian": parse_mode_ionian,
    "mode_mixolydian": parse_mode_mixolydian,
    "mode_dorian": parse_mode_dorian,
    "mode_aeolian": parse_mode_aeolian,
    "mode_phrygian": parse_mode_phrygian,
    "mode_locrian": parse_mode_locrian,
    "song": parse_song,
    "stave": parse_stave,
    "measure": parse_measure,
    "note_element": parse_note_element,
    "note_stem": parse_note_stem,
    "chord": parse_chord,
    "note": parse_note,
    "note_or_rest": parse_note_or_rest,
    "pitch": parse_pitch,
    "octave": parse_octave,
    "basenote": parse_basenote,
    "rest": parse_rest,
    "tie": parse_tie,
    "gracings": parse_gracings,
    "grace_notes": parse_grace_notes,
    "broken_rhythm": parse_broken_rhythm,
    "tuplet": parse_tuplet,
    "tuplet_spec": parse_tuplet_spec,
    "bar": parse_bar,
    "bars": parse_bars,
    "nth_repeat": parse_nth_repeat,
    "guitar_chord": parse_guitar_chord,
    "sharp": parse_sharp,
    "natural": parse_natural,
    "flat": parse_flat,
    "double_sharp": parse_double_sharp,
    "double_flat": parse_double_flat,
    "accidental": parse_accidental,
    "middle_pairs": parse_middle_pairs,
    "time_signature": parse_time_signature,
    "stringNum": parse_stringNum,
    "integer": parse_integer,
    "string": parse_string,
    "string_no_quotes": parse_string_no_quotes,
    "alpha": parse_alpha,
    "_": parse__,
    "whitespace": parse_whitespace,
    "LineTerminator": parse_LineTerminator,
    "nl": parse_nl,
    "comment": parse_comment,
    "Zs": parse_Zs,
    "EOF": parse_EOF
  };

  if (startRule !== undefined) {
    if (parseFunctions[startRule] === undefined) {
      throw new Error("Invalid rule name: " + quote(startRule) + ".");
    }
  } else {
    startRule = "start";
  }

  var pos = 0;
  var reportFailures = 0;
  var rightmostFailuresPos = 0;
  var rightmostFailuresExpected = [];

  function padLeft(input, padding, length) {
    var result = input;

    var padLength = length - input.length;
    for (var i = 0; i < padLength; i++) {
      result = padding + result;
    }

    return result;
  }

  function escape(ch) {
    var charCode = ch.charCodeAt(0);
    var escapeChar;
    var length;

    if (charCode <= 0xFF) {
      escapeChar = 'x';
      length = 2;
    } else {
      escapeChar = 'u';
      length = 4;
    }

    return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
  }

  function matchFailed(failure) {
    if (pos < rightmostFailuresPos) {
      return;
    }

    if (pos > rightmostFailuresPos) {
      rightmostFailuresPos = pos;
      rightmostFailuresExpected = [];
    }

    rightmostFailuresExpected.push(failure);
  }

  function parse_start() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    result0 = parse_header();
    if (result0 !== null) {
      result1 = parse_song();
      if (result1 !== null) {
        result2 = parse_EOF();
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, header, song) {
        return {
          header: header,
          song: song
        }
      })(pos0, result0[0], result0[1]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_header() {
    var result0, result1, result2, result3, result4;
    var pos0, pos1, pos2;

    pos0 = pos;
    pos1 = pos;
    result0 = parse_reference_number();
    result0 = result0 !== null ? result0 : "";
    if (result0 !== null) {
      result2 = parse_title();
      if (result2 !== null) {
        result1 = [];
        while (result2 !== null) {
          result1.push(result2);
          result2 = parse_title();
        }
      } else {
        result1 = null;
      }
      if (result1 !== null) {
        result2 = [];
        pos2 = pos;
        result3 = parse_other_fields();
        if (result3 !== null) {
          result4 = parse__();
          if (result4 !== null) {
            result3 = [result3, result4];
          } else {
            result3 = null;
            pos = pos2;
          }
        } else {
          result3 = null;
          pos = pos2;
        }
        while (result3 !== null) {
          result2.push(result3);
          pos2 = pos;
          result3 = parse_other_fields();
          if (result3 !== null) {
            result4 = parse__();
            if (result4 !== null) {
              result3 = [result3, result4];
            } else {
              result3 = null;
              pos = pos2;
            }
          } else {
            result3 = null;
            pos = pos2;
          }
        }
        if (result2 !== null) {
          pos2 = pos;
          result3 = parse_key();
          if (result3 !== null) {
            result4 = parse__();
            if (result4 !== null) {
              result3 = [result3, result4];
            } else {
              result3 = null;
              pos = pos2;
            }
          } else {
            result3 = null;
            pos = pos2;
          }
          if (result3 !== null) {
            result0 = [result0, result1, result2, result3];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, refnum, title, pairs, k) {
        var p = {
          refnum: refnum || 1, // Fallback to 1 for songs that don't include one
          title: title[0],
          key: k[0]
        }
        for (i = 0; i < pairs.length; i++) {
          p[pairs[i][0][0]] = pairs[i][0][1];
        }
        return p;
      })(pos0, result0[0], result0[1], result0[2], result0[3]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_reference_number() {
    var result0, result1, result2, result3;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.substr(pos, 2) === "X:") {
      result0 = "X:";
      pos += 2;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"X:\"");
      }
    }
    if (result0 !== null) {
      result1 = parse__();
      result1 = result1 !== null ? result1 : "";
      if (result1 !== null) {
        result2 = parse_integer();
        if (result2 !== null) {
          result3 = parse__();
          if (result3 !== null) {
            result0 = [result0, result1, result2, result3];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, value) {
        return value
      })(pos0, result0[2]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_title() {
    var result0, result1, result2, result3;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.substr(pos, 2) === "T:") {
      result0 = "T:";
      pos += 2;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"T:\"");
      }
    }
    if (result0 !== null) {
      result1 = parse__();
      result1 = result1 !== null ? result1 : "";
      if (result1 !== null) {
        result2 = parse_string();
        if (result2 !== null) {
          result3 = parse__();
          if (result3 !== null) {
            result0 = [result0, result1, result2, result3];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, value) {
        return value
      })(pos0, result0[2]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_other_fields() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.substr(pos, 2) === "A:") {
      result0 = "A:";
      pos += 2;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"A:\"");
      }
    }
    if (result0 === null) {
      if (input.substr(pos, 2) === "B:") {
        result0 = "B:";
        pos += 2;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"B:\"");
        }
      }
      if (result0 === null) {
        if (input.substr(pos, 2) === "C:") {
          result0 = "C:";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"C:\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 2) === "D:") {
            result0 = "D:";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"D:\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 2) === "G:") {
              result0 = "G:";
              pos += 2;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"G:\"");
              }
            }
            if (result0 === null) {
              if (input.substr(pos, 2) === "H:") {
                result0 = "H:";
                pos += 2;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"H:\"");
                }
              }
              if (result0 === null) {
                if (input.substr(pos, 2) === "N:") {
                  result0 = "N:";
                  pos += 2;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"N:\"");
                  }
                }
                if (result0 === null) {
                  if (input.substr(pos, 2) === "O:") {
                    result0 = "O:";
                    pos += 2;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"O:\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.substr(pos, 2) === "R:") {
                      result0 = "R:";
                      pos += 2;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"R:\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.substr(pos, 2) === "S:") {
                        result0 = "S:";
                        pos += 2;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"S:\"");
                        }
                      }
                      if (result0 === null) {
                        if (input.substr(pos, 2) === "Z:") {
                          result0 = "Z:";
                          pos += 2;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"Z:\"");
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (result0 !== null) {
      result1 = parse__();
      if (result1 !== null) {
        result2 = parse_string();
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, f, value) {
        var fields = {
          "A:": "area",
          "B:": "book",
          "C:": "composer",
          "D:": "discography",
          "G:": "group",
          "H:": "history",
          "N:": "notes",
          "O:": "origin",
          "R:": "rythm",
          "S:": "source",
          "Z:": "t_note"
        };
        return [fields[f] || "", value];
      })(pos0, result0[0], result0[2]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    if (result0 === null) {
      pos0 = pos;
      pos1 = pos;
      if (input.substr(pos, 2) === "L:") {
        result0 = "L:";
        pos += 2;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"L:\"");
        }
      }
      if (result0 !== null) {
        result1 = parse__();
        if (result1 !== null) {
          result2 = parse_note_length_strict();
          if (result2 !== null) {
            result0 = [result0, result1, result2];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
      if (result0 !== null) {
        result0 = (function(offset, n) {
          defaultTime = WHOLE * eval(n);
          return ["note_length", defaultTime];
        })(pos0, result0[2]);
      }
      if (result0 === null) {
        pos = pos0;
      }
      if (result0 === null) {
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 2) === "M:") {
          result0 = "M:";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"M:\"");
          }
        }
        if (result0 !== null) {
          result1 = parse__();
          if (result1 !== null) {
            result2 = parse_meter();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, m) {
            defaultMeter = WHOLE * (eval(m) < 0.75 ? 0.0625 : 0.125);
            return ["meter", defaultMeter];
          })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          pos1 = pos;
          if (input.substr(pos, 2) === "P:") {
            result0 = "P:";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"P:\"");
            }
          }
          if (result0 !== null) {
            result1 = parse__();
            if (result1 !== null) {
              result2 = parse_parts();
              if (result2 !== null) {
                result0 = [result0, result1, result2];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = (function(offset, p) {
              return p;
            })(pos0, result0[2]);
          }
          if (result0 === null) {
            pos = pos0;
          }
          if (result0 === null) {
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 2) === "Q:") {
              result0 = "Q:";
              pos += 2;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"Q:\"");
              }
            }
            if (result0 !== null) {
              result1 = parse__();
              if (result1 !== null) {
                result2 = parse_tempo();
                if (result2 !== null) {
                  result0 = [result0, result1, result2];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = (function(offset, t) {
                return t;
              })(pos0, result0[2]);
            }
            if (result0 === null) {
              pos = pos0;
            }
          }
        }
      }
    }
    return result0;
  }

  function parse_tempo() {
    var result0, result1, result2, result3, result4;
    var pos0;

    result1 = parse_integer();
    if (result1 !== null) {
      result0 = [];
      while (result1 !== null) {
        result0.push(result1);
        result1 = parse_integer();
      }
    } else {
      result0 = null;
    }
    if (result0 === null) {
      pos0 = pos;
      if (input.charCodeAt(pos) === 67) {
        result0 = "C";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"C\"");
        }
      }
      if (result0 !== null) {
        result1 = parse_note_length();
        result1 = result1 !== null ? result1 : "";
        if (result1 !== null) {
          if (input.charCodeAt(pos) === 61) {
            result2 = "=";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (result2 !== null) {
            result4 = parse_integer();
            if (result4 !== null) {
              result3 = [];
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse_integer();
              }
            } else {
              result3 = null;
            }
            if (result3 !== null) {
              result0 = [result0, result1, result2, result3];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
      } else {
        result0 = null;
        pos = pos0;
      }
      if (result0 === null) {
        pos0 = pos;
        result0 = parse_note_length_strict();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 61) {
            result1 = "=";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (result1 !== null) {
            result3 = parse_integer();
            if (result3 !== null) {
              result2 = [];
              while (result3 !== null) {
                result2.push(result3);
                result3 = parse_integer();
              }
            } else {
              result2 = null;
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
      }
    }
    return result0;
  }

  function parse_meter() {
    var result0;

    if (input.charCodeAt(pos) === 67) {
      result0 = "C";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"C\"");
      }
    }
    if (result0 === null) {
      if (input.substr(pos, 2) === "C|") {
        result0 = "C|";
        pos += 2;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"C|\"");
        }
      }
      if (result0 === null) {
        result0 = parse_meter_fraction();
      }
    }
    return result0;
  }

  function parse_meter_fraction() {
    var result0, result1, result2, result3;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    result1 = parse_integer();
    if (result1 !== null) {
      result0 = [];
      while (result1 !== null) {
        result0.push(result1);
        result1 = parse_integer();
      }
    } else {
      result0 = null;
    }
    if (result0 !== null) {
      if (input.charCodeAt(pos) === 47) {
        result1 = "/";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"/\"");
        }
      }
      if (result1 !== null) {
        result3 = parse_integer();
        if (result3 !== null) {
          result2 = [];
          while (result3 !== null) {
            result2.push(result3);
            result3 = parse_integer();
          }
        } else {
          result2 = null;
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, l) {
        return l.join("")
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_note_length_strict() {
    var result0, result1, result2, result3;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    result1 = parse_integer();
    if (result1 !== null) {
      result0 = [];
      while (result1 !== null) {
        result0.push(result1);
        result1 = parse_integer();
      }
    } else {
      result0 = null;
    }
    if (result0 !== null) {
      if (input.charCodeAt(pos) === 47) {
        result1 = "/";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"/\"");
        }
      }
      if (result1 !== null) {
        result3 = parse_integer();
        if (result3 !== null) {
          result2 = [];
          while (result3 !== null) {
            result2.push(result3);
            result3 = parse_integer();
          }
        } else {
          result2 = null;
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, l) {
        return l.join("")
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_note_length() {
    var result0, result1, result2, result3;
    var pos0, pos1;

    pos0 = pos;
    result1 = parse_integer();
    if (result1 !== null) {
      result0 = [];
      while (result1 !== null) {
        result0.push(result1);
        result1 = parse_integer();
      }
    } else {
      result0 = null;
    }
    result0 = result0 !== null ? result0 : "";
    if (result0 !== null) {
      pos1 = pos;
      if (input.charCodeAt(pos) === 47) {
        result1 = "/";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"/\"");
        }
      }
      if (result1 !== null) {
        result3 = parse_integer();
        if (result3 !== null) {
          result2 = [];
          while (result3 !== null) {
            result2.push(result3);
            result3 = parse_integer();
          }
        } else {
          result2 = null;
        }
        if (result2 !== null) {
          result1 = [result1, result2];
        } else {
          result1 = null;
          pos = pos1;
        }
      } else {
        result1 = null;
        pos = pos1;
      }
      result1 = result1 !== null ? result1 : "";
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos0;
      }
    } else {
      result0 = null;
      pos = pos0;
    }
    return result0;
  }

  function parse_parts() {
    var result0, result1;

    result1 = parse_part_spec();
    if (result1 !== null) {
      result0 = [];
      while (result1 !== null) {
        result0.push(result1);
        result1 = parse_part_spec();
      }
    } else {
      result0 = null;
    }
    return result0;
  }

  function parse_part_spec() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    result0 = parse_part();
    if (result0 === null) {
      pos1 = pos;
      if (input.charCodeAt(pos) === 40) {
        result0 = "(";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"(\"");
        }
      }
      if (result0 !== null) {
        result2 = parse_part_spec();
        if (result2 !== null) {
          result1 = [];
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_part_spec();
          }
        } else {
          result1 = null;
        }
        if (result1 !== null) {
          if (input.charCodeAt(pos) === 41) {
            result2 = ")";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\")\"");
            }
          }
          if (result2 !== null) {
            result0 = [result0, result1, result2];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    }
    if (result0 !== null) {
      result2 = parse_integer();
      if (result2 !== null) {
        result1 = [];
        while (result2 !== null) {
          result1.push(result2);
          result2 = parse_integer();
        }
      } else {
        result1 = null;
      }
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos0;
      }
    } else {
      result0 = null;
      pos = pos0;
    }
    return result0;
  }

  function parse_part() {
    var result0;

    if (input.charCodeAt(pos) === 65) {
      result0 = "A";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"A\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 66) {
        result0 = "B";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"B\"");
        }
      }
      if (result0 === null) {
        if (input.charCodeAt(pos) === 67) {
          result0 = "C";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"C\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 68) {
            result0 = "D";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"D\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos) === 69) {
              result0 = "E";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"E\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 70) {
                result0 = "F";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"F\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 71) {
                  result0 = "G";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"G\"");
                  }
                }
                if (result0 === null) {
                  if (input.charCodeAt(pos) === 72) {
                    result0 = "H";
                    pos++;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"H\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.charCodeAt(pos) === 73) {
                      result0 = "I";
                      pos++;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"I\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.charCodeAt(pos) === 74) {
                        result0 = "J";
                        pos++;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"J\"");
                        }
                      }
                      if (result0 === null) {
                        if (input.charCodeAt(pos) === 75) {
                          result0 = "K";
                          pos++;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"K\"");
                          }
                        }
                        if (result0 === null) {
                          if (input.charCodeAt(pos) === 76) {
                            result0 = "L";
                            pos++;
                          } else {
                            result0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"L\"");
                            }
                          }
                          if (result0 === null) {
                            if (input.charCodeAt(pos) === 77) {
                              result0 = "M";
                              pos++;
                            } else {
                              result0 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"M\"");
                              }
                            }
                            if (result0 === null) {
                              if (input.charCodeAt(pos) === 78) {
                                result0 = "N";
                                pos++;
                              } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"N\"");
                                }
                              }
                              if (result0 === null) {
                                if (input.charCodeAt(pos) === 79) {
                                  result0 = "O";
                                  pos++;
                                } else {
                                  result0 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\"O\"");
                                  }
                                }
                                if (result0 === null) {
                                  if (input.charCodeAt(pos) === 80) {
                                    result0 = "P";
                                    pos++;
                                  } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\"P\"");
                                    }
                                  }
                                  if (result0 === null) {
                                    if (input.charCodeAt(pos) === 81) {
                                      result0 = "Q";
                                      pos++;
                                    } else {
                                      result0 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\"Q\"");
                                      }
                                    }
                                    if (result0 === null) {
                                      if (input.charCodeAt(pos) === 82) {
                                        result0 = "R";
                                        pos++;
                                      } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\"R\"");
                                        }
                                      }
                                      if (result0 === null) {
                                        if (input.charCodeAt(pos) === 83) {
                                          result0 = "S";
                                          pos++;
                                        } else {
                                          result0 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\"S\"");
                                          }
                                        }
                                        if (result0 === null) {
                                          if (input.charCodeAt(pos) === 84) {
                                            result0 = "T";
                                            pos++;
                                          } else {
                                            result0 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\"T\"");
                                            }
                                          }
                                          if (result0 === null) {
                                            if (input.charCodeAt(pos) === 85) {
                                              result0 = "U";
                                              pos++;
                                            } else {
                                              result0 = null;
                                              if (reportFailures === 0) {
                                                matchFailed("\"U\"");
                                              }
                                            }
                                            if (result0 === null) {
                                              if (input.charCodeAt(pos) === 86) {
                                                result0 = "V";
                                                pos++;
                                              } else {
                                                result0 = null;
                                                if (reportFailures === 0) {
                                                  matchFailed("\"V\"");
                                                }
                                              }
                                              if (result0 === null) {
                                                if (input.charCodeAt(pos) === 88) {
                                                  result0 = "X";
                                                  pos++;
                                                } else {
                                                  result0 = null;
                                                  if (reportFailures === 0) {
                                                    matchFailed("\"X\"");
                                                  }
                                                }
                                                if (result0 === null) {
                                                  if (input.charCodeAt(pos) === 89) {
                                                    result0 = "Y";
                                                    pos++;
                                                  } else {
                                                    result0 = null;
                                                    if (reportFailures === 0) {
                                                      matchFailed("\"Y\"");
                                                    }
                                                  }
                                                  if (result0 === null) {
                                                    if (input.charCodeAt(pos) === 90) {
                                                      result0 = "Z";
                                                      pos++;
                                                    } else {
                                                      result0 = null;
                                                      if (reportFailures === 0) {
                                                        matchFailed("\"Z\"");
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return result0;
  }

  function parse_key() {
    var result0, result1, result2, result3;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.substr(pos, 2) === "K:") {
      result0 = "K:";
      pos += 2;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"K:\"");
      }
    }
    if (result0 !== null) {
      result1 = parse__();
      if (result1 !== null) {
        result2 = parse_key_def();
        if (result2 !== null) {
          result3 = parse__();
          if (result3 !== null) {
            result0 = [result0, result1, result2, result3];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, k) {
        return k
      })(pos0, result0[2]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_key_def() {
    var result0;

    result0 = parse_key_spec();
    if (result0 === null) {
      if (input.substr(pos, 2) === "HP") {
        result0 = "HP";
        pos += 2;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"HP\"");
        }
      }
      if (result0 === null) {
        if (input.substr(pos, 2) === "Hp") {
          result0 = "Hp";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"Hp\"");
          }
        }
      }
    }
    return result0;
  }

  function parse_key_spec() {
    var result0, result1, result2, result3, result4;
    var pos0, pos1, pos2;

    pos0 = pos;
    pos1 = pos;
    result0 = parse_keynote();
    if (result0 !== null) {
      result1 = parse_mode_spec();
      result1 = result1 !== null ? result1 : "";
      if (result1 !== null) {
        result2 = [];
        pos2 = pos;
        if (input.charCodeAt(pos) === 32) {
          result3 = " ";
          pos++;
        } else {
          result3 = null;
          if (reportFailures === 0) {
            matchFailed("\" \"");
          }
        }
        if (result3 !== null) {
          result4 = parse_global_accidental();
          if (result4 !== null) {
            result3 = [result3, result4];
          } else {
            result3 = null;
            pos = pos2;
          }
        } else {
          result3 = null;
          pos = pos2;
        }
        while (result3 !== null) {
          result2.push(result3);
          pos2 = pos;
          if (input.charCodeAt(pos) === 32) {
            result3 = " ";
            pos++;
          } else {
            result3 = null;
            if (reportFailures === 0) {
              matchFailed("\" \"");
            }
          }
          if (result3 !== null) {
            result4 = parse_global_accidental();
            if (result4 !== null) {
              result3 = [result3, result4];
            } else {
              result3 = null;
              pos = pos2;
            }
          } else {
            result3 = null;
            pos = pos2;
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, k, m, g) {
        if (m)
          k.mode = m;
        return k;
      })(pos0, result0[0], result0[1], result0[2]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_keynote() {
    var result0, result1;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    result0 = parse_basenote();
    if (result0 !== null) {
      result1 = parse_key_accidental();
      result1 = result1 !== null ? result1 : "";
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, bn, k) {
        return {
          baseNote: bn,
          accidental: k
        }
      })(pos0, result0[0], result0[1]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_key_accidental() {
    var result0;

    if (input.charCodeAt(pos) === 35) {
      result0 = "#";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"#\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 98) {
        result0 = "b";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"b\"");
        }
      }
    }
    return result0;
  }

  function parse_mode_spec() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 32) {
      result0 = " ";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\" \"");
      }
    }
    result0 = result0 !== null ? result0 : "";
    if (result0 !== null) {
      result1 = parse_mode();
      if (result1 !== null) {
        result2 = parse_extratext();
        result2 = result2 !== null ? result2 : "";
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, m) {
        return m
      })(pos0, result0[1]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_mode() {
    var result0;

    result0 = parse_mode_minor();
    if (result0 === null) {
      result0 = parse_mode_major();
      if (result0 === null) {
        result0 = parse_mode_lydian();
        if (result0 === null) {
          result0 = parse_mode_ionian();
          if (result0 === null) {
            result0 = parse_mode_mixolydian();
            if (result0 === null) {
              result0 = parse_mode_dorian();
              if (result0 === null) {
                result0 = parse_mode_aeolian();
                if (result0 === null) {
                  result0 = parse_mode_phrygian();
                  if (result0 === null) {
                    result0 = parse_mode_locrian();
                  }
                }
              }
            }
          }
        }
      }
    }
    return result0;
  }

  function parse_extratext() {
    var result0, result1;

    result0 = [];
    result1 = parse_alpha();
    while (result1 !== null) {
      result0.push(result1);
      result1 = parse_alpha();
    }
    return result0;
  }

  function parse_global_accidental() {
    var result0, result1;
    var pos0;

    pos0 = pos;
    result0 = parse_accidental();
    if (result0 !== null) {
      result1 = parse_basenote();
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos0;
      }
    } else {
      result0 = null;
      pos = pos0;
    }
    return result0;
  }

  function parse_mode_minor() {
    var result0, result1, result2;
    var pos0, pos1, pos2;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 109) {
      result0 = "m";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"m\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 77) {
        result0 = "M";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"M\"");
        }
      }
    }
    if (result0 !== null) {
      pos2 = pos;
      if (input.charCodeAt(pos) === 105) {
        result1 = "i";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"i\"");
        }
      }
      if (result1 === null) {
        if (input.charCodeAt(pos) === 73) {
          result1 = "I";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"I\"");
          }
        }
      }
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 110) {
          result2 = "n";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"n\"");
          }
        }
        if (result2 === null) {
          if (input.charCodeAt(pos) === 78) {
            result2 = "N";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"N\"");
            }
          }
        }
        if (result2 !== null) {
          result1 = [result1, result2];
        } else {
          result1 = null;
          pos = pos2;
        }
      } else {
        result1 = null;
        pos = pos2;
      }
      result1 = result1 !== null ? result1 : "";
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        return chars.join("")
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_mode_major() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 109) {
      result0 = "m";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"m\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 77) {
        result0 = "M";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"M\"");
        }
      }
    }
    if (result0 !== null) {
      if (input.charCodeAt(pos) === 97) {
        result1 = "a";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"a\"");
        }
      }
      if (result1 === null) {
        if (input.charCodeAt(pos) === 65) {
          result1 = "A";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"A\"");
          }
        }
      }
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 106) {
          result2 = "j";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"j\"");
          }
        }
        if (result2 === null) {
          if (input.charCodeAt(pos) === 74) {
            result2 = "J";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"J\"");
            }
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        return chars.join("")
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_mode_lydian() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 108) {
      result0 = "l";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"l\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 76) {
        result0 = "L";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"L\"");
        }
      }
    }
    if (result0 !== null) {
      if (input.charCodeAt(pos) === 121) {
        result1 = "y";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"y\"");
        }
      }
      if (result1 === null) {
        if (input.charCodeAt(pos) === 89) {
          result1 = "Y";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"Y\"");
          }
        }
      }
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 100) {
          result2 = "d";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"d\"");
          }
        }
        if (result2 === null) {
          if (input.charCodeAt(pos) === 68) {
            result2 = "D";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"D\"");
            }
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        return chars.join("")
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_mode_ionian() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 105) {
      result0 = "i";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"i\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 73) {
        result0 = "I";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"I\"");
        }
      }
    }
    if (result0 !== null) {
      if (input.charCodeAt(pos) === 111) {
        result1 = "o";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"o\"");
        }
      }
      if (result1 === null) {
        if (input.charCodeAt(pos) === 79) {
          result1 = "O";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"O\"");
          }
        }
      }
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 110) {
          result2 = "n";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"n\"");
          }
        }
        if (result2 === null) {
          if (input.charCodeAt(pos) === 78) {
            result2 = "N";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"N\"");
            }
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        return chars.join("")
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_mode_mixolydian() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 109) {
      result0 = "m";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"m\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 77) {
        result0 = "M";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"M\"");
        }
      }
    }
    if (result0 !== null) {
      if (input.charCodeAt(pos) === 105) {
        result1 = "i";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"i\"");
        }
      }
      if (result1 === null) {
        if (input.charCodeAt(pos) === 73) {
          result1 = "I";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"I\"");
          }
        }
      }
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 120) {
          result2 = "x";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"x\"");
          }
        }
        if (result2 === null) {
          if (input.charCodeAt(pos) === 88) {
            result2 = "X";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"X\"");
            }
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        return chars.join("")
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_mode_dorian() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 100) {
      result0 = "d";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"d\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 68) {
        result0 = "D";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"D\"");
        }
      }
    }
    if (result0 !== null) {
      if (input.charCodeAt(pos) === 111) {
        result1 = "o";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"o\"");
        }
      }
      if (result1 === null) {
        if (input.charCodeAt(pos) === 79) {
          result1 = "O";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"O\"");
          }
        }
      }
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 114) {
          result2 = "r";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"r\"");
          }
        }
        if (result2 === null) {
          if (input.charCodeAt(pos) === 82) {
            result2 = "R";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"R\"");
            }
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        return chars.join("")
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_mode_aeolian() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 97) {
      result0 = "a";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"a\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 65) {
        result0 = "A";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"A\"");
        }
      }
    }
    if (result0 !== null) {
      if (input.charCodeAt(pos) === 101) {
        result1 = "e";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"e\"");
        }
      }
      if (result1 === null) {
        if (input.charCodeAt(pos) === 69) {
          result1 = "E";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"E\"");
          }
        }
      }
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 111) {
          result2 = "o";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"o\"");
          }
        }
        if (result2 === null) {
          if (input.charCodeAt(pos) === 79) {
            result2 = "O";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"O\"");
            }
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        return chars.join("")
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_mode_phrygian() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 112) {
      result0 = "p";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"p\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 80) {
        result0 = "P";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"P\"");
        }
      }
    }
    if (result0 !== null) {
      if (input.charCodeAt(pos) === 104) {
        result1 = "h";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"h\"");
        }
      }
      if (result1 === null) {
        if (input.charCodeAt(pos) === 72) {
          result1 = "H";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"H\"");
          }
        }
      }
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 114) {
          result2 = "r";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"r\"");
          }
        }
        if (result2 === null) {
          if (input.charCodeAt(pos) === 82) {
            result2 = "R";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"R\"");
            }
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        return chars.join("")
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_mode_locrian() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 108) {
      result0 = "l";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"l\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 76) {
        result0 = "L";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"L\"");
        }
      }
    }
    if (result0 !== null) {
      if (input.charCodeAt(pos) === 111) {
        result1 = "o";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"o\"");
        }
      }
      if (result1 === null) {
        if (input.charCodeAt(pos) === 79) {
          result1 = "O";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"O\"");
          }
        }
      }
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 99) {
          result2 = "c";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"c\"");
          }
        }
        if (result2 === null) {
          if (input.charCodeAt(pos) === 67) {
            result2 = "C";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"C\"");
            }
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        return chars.join("")
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_song() {
    var result0, result1;
    var pos0;

    pos0 = pos;
    result1 = parse_stave();
    if (result1 !== null) {
      result0 = [];
      while (result1 !== null) {
        result0.push(result1);
        result1 = parse_stave();
      }
    } else {
      result0 = null;
    }
    if (result0 !== null) {
      result1 = parse__();
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos0;
      }
    } else {
      result0 = null;
      pos = pos0;
    }
    return result0;
  }

  function parse_stave() {
    var result0, result1;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    result1 = parse_measure();
    if (result1 !== null) {
      result0 = [];
      while (result1 !== null) {
        result0.push(result1);
        result1 = parse_measure();
      }
    } else {
      result0 = null;
    }
    if (result0 !== null) {
      result1 = parse__();
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, measures) {
        return measures;
      })(pos0, result0[0]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_measure() {
    var result0, result1, result2, result3, result4, result5, result6, result7;
    var pos0, pos1, pos2;

    pos0 = pos;
    pos1 = pos;
    result0 = parse__();
    if (result0 !== null) {
      result1 = parse_bar();
      result1 = result1 !== null ? result1 : "";
      if (result1 !== null) {
        result3 = parse_note_element();
        if (result3 === null) {
          result3 = parse_tuplet();
        }
        if (result3 !== null) {
          result2 = [];
          while (result3 !== null) {
            result2.push(result3);
            result3 = parse_note_element();
            if (result3 === null) {
              result3 = parse_tuplet();
            }
          }
        } else {
          result2 = null;
        }
        if (result2 !== null) {
          result3 = parse__();
          if (result3 !== null) {
            result4 = parse_bar();
            if (result4 === null) {
              result4 = parse_nth_repeat();
            }
            if (result4 !== null) {
              result5 = parse_nth_repeat();
              result5 = result5 !== null ? result5 : "";
              if (result5 !== null) {
                pos2 = pos;
                if (input.charCodeAt(pos) === 92) {
                  result6 = "\\";
                  pos++;
                } else {
                  result6 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"\\\\\"");
                  }
                }
                if (result6 !== null) {
                  result7 = parse_nl();
                  if (result7 !== null) {
                    result6 = [result6, result7];
                  } else {
                    result6 = null;
                    pos = pos2;
                  }
                } else {
                  result6 = null;
                  pos = pos2;
                }
                result6 = result6 !== null ? result6 : "";
                if (result6 !== null) {
                  result0 = [result0, result1, result2, result3, result4, result5, result6];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, notes, bar) {

        var finalNotes = [];
        var counter = 0;
        var beams = [
          []
        ];
        var len = notes.length;

        for (var n = 0; n < len; n++) {
          var note = notes[n];
          var lastBeam = beams[beams.length - 1];
          var lastBeamLen = lastBeam.length;

          if (note.note === "rest") {
            // If the last beam contains only one note there is really no need
            // for beaming, so I delete the 'beam' property from that lone note
            // and then lastBeam is emptied.
            // In case the last beam contains more notes, an empty array is
            // pushed in beams to break the beaming. The counter is increased
            // so the next generated beam is a new one.
            if (lastBeamLen === 1) {
              lastBeam[0].beam = null;
              lastBeam.pop();
            } else if (lastBeamLen > 1) {
              beams.push([]);
            }

            counter = counter + 1;
            finalNotes.push([note]);
            continue;
          }

          if (len > 1) {
            if (note.duration < QUARTER &&
              !((n === len - 1) && !lastBeamLen)) {
              lastBeam.push(note);
              note.beam = counter;
            } else if (note.duration >= QUARTER) {
              if (lastBeamLen === 1) {
                lastBeam[0].beam = null;
                lastBeam.pop();
              } else if (lastBeamLen > 1) {
                counter++;
                beams.push([]);
              }
            }
          }

          if (!Array.isArray(note))
            note = [note];

          finalNotes.push(note);
        }
        var mObj = {
          bar: bar[0],
          chords: []
        };

        // For each note/chord we create a chord object that contains a notes array
        // with the proper note/chord, and attach it to the chords that the measure
        // will contain.
        finalNotes.forEach(function(n) {
          mObj.chords.push({
            notes: n
          });
        });

        return mObj;
      })(pos0, result0[2], result0[4]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_note_element() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    result0 = parse_note_stem();
    if (result0 !== null) {
      result1 = parse_broken_rhythm();
      result1 = result1 !== null ? result1 : "";
      if (result1 !== null) {
        result2 = parse__();
        result2 = result2 !== null ? result2 : "";
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, n) {
        return n
      })(pos0, result0[0]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_note_stem() {
    var result0, result1, result2, result3;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    result0 = parse_guitar_chord();
    result0 = result0 !== null ? result0 : "";
    if (result0 !== null) {
      result1 = parse_grace_notes();
      result1 = result1 !== null ? result1 : "";
      if (result1 !== null) {
        result2 = [];
        result3 = parse_gracings();
        while (result3 !== null) {
          result2.push(result3);
          result3 = parse_gracings();
        }
        if (result2 !== null) {
          result3 = parse_note();
          if (result3 === null) {
            result3 = parse_chord();
          }
          if (result3 !== null) {
            result0 = [result0, result1, result2, result3];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, gc, gn, n) {
        if (gc)
          n.guitar_chord = gc;
        if (gn)
          n.grace_notes = gn;

        return n;
      })(pos0, result0[0], result0[1], result0[3]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_chord() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 91) {
      result0 = "[";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"[\"");
      }
    }
    if (result0 !== null) {
      result2 = parse_note();
      if (result2 !== null) {
        result1 = [];
        while (result2 !== null) {
          result1.push(result2);
          result2 = parse_note();
        }
      } else {
        result1 = null;
      }
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 93) {
          result2 = "]";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"]\"");
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, n) {
        return n
      })(pos0, result0[1]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_note() {
    var result0, result1, result2, result3;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    result0 = parse_note_or_rest();
    if (result0 !== null) {
      result1 = parse_time_signature();
      result1 = result1 !== null ? result1 : "";
      if (result1 !== null) {
        result2 = parse__();
        result2 = result2 !== null ? result2 : "";
        if (result2 !== null) {
          result3 = parse_tie();
          result3 = result3 !== null ? result3 : "";
          if (result3 !== null) {
            result0 = [result0, result1, result2, result3];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, n, time, tie) {
        if (time) {
          n.duration = time.duration;
          n.dots = time.dots
        } else {
          n.duration = defaultTime || defaultMeter;
        }

        if (tie)
          n.tie = true;

        return n;
      })(pos0, result0[0], result0[1], result0[3]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_note_or_rest() {
    var result0;
    var pos0;

    pos0 = pos;
    result0 = parse_pitch();
    if (result0 === null) {
      result0 = parse_rest();
    }
    if (result0 !== null) {
      result0 = (function(offset, n) {
        return n
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_pitch() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    result0 = parse_accidental();
    result0 = result0 !== null ? result0 : "";
    if (result0 !== null) {
      result1 = parse_basenote();
      if (result1 !== null) {
        result2 = parse_octave();
        result2 = result2 !== null ? result2 : "";
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, acc, bn, o) {
        var obj = {
          accidental: acc,
          note: bn + o
        }

        if (!acc)
          delete obj.accidental;

        return obj;
      })(pos0, result0[0], result0[1], result0[2]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_octave() {
    var result0;

    if (input.charCodeAt(pos) === 39) {
      result0 = "'";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"'\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 44) {
        result0 = ",";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\",\"");
        }
      }
    }
    return result0;
  }

  function parse_basenote() {
    var result0;

    if (/^[A-G]/.test(input.charAt(pos))) {
      result0 = input.charAt(pos);
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("[A-G]");
      }
    }
    if (result0 === null) {
      if (/^[a-g]/.test(input.charAt(pos))) {
        result0 = input.charAt(pos);
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("[a-g]");
        }
      }
    }
    return result0;
  }

  function parse_rest() {
    var result0;
    var pos0;

    pos0 = pos;
    if (input.charCodeAt(pos) === 122) {
      result0 = "z";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"z\"");
      }
    }
    if (result0 !== null) {
      result0 = (function(offset) {
        return {
          note: "rest"
        }
      })(pos0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_tie() {
    var result0;

    if (input.charCodeAt(pos) === 45) {
      result0 = "-";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"-\"");
      }
    }
    return result0;
  }

  function parse_gracings() {
    var result0;

    if (input.charCodeAt(pos) === 126) {
      result0 = "~";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"~\"");
      }
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 46) {
        result0 = ".";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\".\"");
        }
      }
      if (result0 === null) {
        if (input.charCodeAt(pos) === 118) {
          result0 = "v";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"v\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 117) {
            result0 = "u";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"u\"");
            }
          }
        }
      }
    }
    return result0;
  }

  function parse_grace_notes() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 123) {
      result0 = "{";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"{\"");
      }
    }
    if (result0 !== null) {
      result2 = parse_pitch();
      if (result2 !== null) {
        result1 = [];
        while (result2 !== null) {
          result1.push(result2);
          result2 = parse_pitch();
        }
      } else {
        result1 = null;
      }
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 125) {
          result2 = "}";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"}\"");
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, p) {
        return p
      })(pos0, result0[1]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_broken_rhythm() {
    var result0, result1;

    if (input.charCodeAt(pos) === 60) {
      result1 = "<";
      pos++;
    } else {
      result1 = null;
      if (reportFailures === 0) {
        matchFailed("\"<\"");
      }
    }
    if (result1 !== null) {
      result0 = [];
      while (result1 !== null) {
        result0.push(result1);
        if (input.charCodeAt(pos) === 60) {
          result1 = "<";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"<\"");
          }
        }
      }
    } else {
      result0 = null;
    }
    if (result0 === null) {
      if (input.charCodeAt(pos) === 62) {
        result1 = ">";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\">\"");
        }
      }
      if (result1 !== null) {
        result0 = [];
        while (result1 !== null) {
          result0.push(result1);
          if (input.charCodeAt(pos) === 62) {
            result1 = ">";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\">\"");
            }
          }
        }
      } else {
        result0 = null;
      }
    }
    return result0;
  }

  function parse_tuplet() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    result0 = parse_tuplet_spec();
    if (result0 !== null) {
      result2 = parse_note_element();
      if (result2 !== null) {
        result1 = [];
        while (result2 !== null) {
          result1.push(result2);
          result2 = parse_note_element();
        }
      } else {
        result1 = null;
      }
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, n) {
        return {
          type: "tuple",
          notes: n
        }
      })(pos0, result0[1]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_tuplet_spec() {
    var result0, result1, result2, result3, result4, result5;
    var pos0, pos1, pos2;

    pos0 = pos;
    if (input.charCodeAt(pos) === 40) {
      result0 = "(";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"(\"");
      }
    }
    if (result0 !== null) {
      result1 = parse_integer();
      if (result1 !== null) {
        pos1 = pos;
        if (input.charCodeAt(pos) === 58) {
          result2 = ":";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\":\"");
          }
        }
        if (result2 !== null) {
          result3 = parse_integer();
          if (result3 !== null) {
            pos2 = pos;
            if (input.charCodeAt(pos) === 58) {
              result4 = ":";
              pos++;
            } else {
              result4 = null;
              if (reportFailures === 0) {
                matchFailed("\":\"");
              }
            }
            if (result4 !== null) {
              result5 = parse_integer();
              result5 = result5 !== null ? result5 : "";
              if (result5 !== null) {
                result4 = [result4, result5];
              } else {
                result4 = null;
                pos = pos2;
              }
            } else {
              result4 = null;
              pos = pos2;
            }
            result4 = result4 !== null ? result4 : "";
            if (result4 !== null) {
              result2 = [result2, result3, result4];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
        } else {
          result2 = null;
          pos = pos1;
        }
        result2 = result2 !== null ? result2 : "";
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos0;
        }
      } else {
        result0 = null;
        pos = pos0;
      }
    } else {
      result0 = null;
      pos = pos0;
    }
    return result0;
  }

  function parse_bar() {
    var result0, result1;
    var pos0, pos1;

    pos0 = pos;
    result0 = parse_bars();
    if (result0 !== null) {
      pos1 = pos;
      reportFailures++;
      result1 = parse_stringNum();
      reportFailures--;
      if (result1 === null) {
        result1 = "";
      } else {
        result1 = null;
        pos = pos1;
      }
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos0;
      }
    } else {
      result0 = null;
      pos = pos0;
    }
    return result0;
  }

  function parse_bars() {
    var result0;

    if (input.substr(pos, 2) === "|]") {
      result0 = "|]";
      pos += 2;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"|]\"");
      }
    }
    if (result0 === null) {
      if (input.substr(pos, 2) === "||") {
        result0 = "||";
        pos += 2;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"||\"");
        }
      }
      if (result0 === null) {
        if (input.substr(pos, 2) === "[|") {
          result0 = "[|";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"[|\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 2) === "|]") {
            result0 = "|]";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"|]\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 2) === "|:") {
              result0 = "|:";
              pos += 2;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"|:\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 124) {
                result0 = "|";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"|\"");
                }
              }
              if (result0 === null) {
                if (input.substr(pos, 2) === ":|") {
                  result0 = ":|";
                  pos += 2;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\":|\"");
                  }
                }
                if (result0 === null) {
                  if (input.substr(pos, 2) === "::") {
                    result0 = "::";
                    pos += 2;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"::\"");
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return result0;
  }

  function parse_nth_repeat() {
    var result0;

    if (input.substr(pos, 2) === "[1") {
      result0 = "[1";
      pos += 2;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"[1\"");
      }
    }
    if (result0 === null) {
      if (input.substr(pos, 2) === "[2") {
        result0 = "[2";
        pos += 2;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"[2\"");
        }
      }
      if (result0 === null) {
        if (input.substr(pos, 2) === "|1") {
          result0 = "|1";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"|1\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 3) === ":|2") {
            result0 = ":|2";
            pos += 3;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\":|2\"");
            }
          }
        }
      }
    }
    return result0;
  }

  function parse_guitar_chord() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 34) {
      result0 = "\"";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"\\\"\"");
      }
    }
    if (result0 !== null) {
      result1 = parse_string_no_quotes();
      if (result1 !== null) {
        if (input.charCodeAt(pos) === 34) {
          result2 = "\"";
          pos++;
        } else {
          result2 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\\"\"");
          }
        }
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, chord) {
        return chord
      })(pos0, result0[1]);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_sharp() {
    var result0, result1;
    var pos0, pos1, pos2;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 94) {
      result0 = "^";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"^\"");
      }
    }
    if (result0 !== null) {
      pos2 = pos;
      reportFailures++;
      if (input.charCodeAt(pos) === 94) {
        result1 = "^";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"^\"");
        }
      }
      reportFailures--;
      if (result1 === null) {
        result1 = "";
      } else {
        result1 = null;
        pos = pos2;
      }
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset) {
        return "sharp"
      })(pos0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_natural() {
    var result0;

    if (input.charCodeAt(pos) === 61) {
      result0 = "=";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"=\"");
      }
    }
    return result0;
  }

  function parse_flat() {
    var result0, result1;
    var pos0, pos1, pos2;

    pos0 = pos;
    pos1 = pos;
    if (input.charCodeAt(pos) === 95) {
      result0 = "_";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"_\"");
      }
    }
    if (result0 !== null) {
      pos2 = pos;
      reportFailures++;
      if (input.charCodeAt(pos) === 95) {
        result1 = "_";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"_\"");
        }
      }
      reportFailures--;
      if (result1 === null) {
        result1 = "";
      } else {
        result1 = null;
        pos = pos2;
      }
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset) {
        return "flat"
      })(pos0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_double_sharp() {
    var result0;
    var pos0;

    pos0 = pos;
    if (input.substr(pos, 2) === "^^") {
      result0 = "^^";
      pos += 2;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"^^\"");
      }
    }
    if (result0 !== null) {
      result0 = (function(offset) {
        return "dsharp"
      })(pos0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_double_flat() {
    var result0;
    var pos0;

    pos0 = pos;
    if (input.substr(pos, 2) === "__") {
      result0 = "__";
      pos += 2;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"__\"");
      }
    }
    if (result0 !== null) {
      result0 = (function(offset) {
        return "dflat"
      })(pos0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_accidental() {
    var result0;

    result0 = parse_sharp();
    if (result0 === null) {
      result0 = parse_flat();
      if (result0 === null) {
        result0 = parse_natural();
        if (result0 === null) {
          result0 = parse_double_sharp();
          if (result0 === null) {
            result0 = parse_double_flat();
          }
        }
      }
    }
    return result0;
  }

  function parse_middle_pairs() {
    var result0;

    if (/^[^XKa-z]/.test(input.charAt(pos))) {
      result0 = input.charAt(pos);
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("[^XKa-z]");
      }
    }
    return result0;
  }

  function parse_time_signature() {
    var result0, result1, result2;
    var pos0, pos1;

    pos0 = pos;
    pos1 = pos;
    result0 = parse_stringNum();
    if (result0 !== null) {
      if (input.charCodeAt(pos) === 47) {
        result1 = "/";
        pos++;
      } else {
        result1 = null;
        if (reportFailures === 0) {
          matchFailed("\"/\"");
        }
      }
      if (result1 !== null) {
        result2 = parse_stringNum();
        if (result2 !== null) {
          result0 = [result0, result1, result2];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
    } else {
      result0 = null;
      pos = pos1;
    }
    if (result0 !== null) {
      result0 = (function(offset, ts) {
        var num = parseInt(ts[0]) * (defaultTime || defaultMeter);
        var denom = parseInt(ts[2]);
        var result = parseInt(num / denom);

        return createTimeSignature(result);
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    if (result0 === null) {
      pos0 = pos;
      pos1 = pos;
      if (input.charCodeAt(pos) === 47) {
        result0 = "/";
        pos++;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"/\"");
        }
      }
      if (result0 !== null) {
        result1 = parse_stringNum();
        if (result1 !== null) {
          result0 = [result0, result1];
        } else {
          result0 = null;
          pos = pos1;
        }
      } else {
        result0 = null;
        pos = pos1;
      }
      if (result0 !== null) {
        result0 = (function(offset, ts) {
          var result = parseInt((defaultTime || defaultMeter) / parseInt(ts[1]));
          return createTimeSignature(result);
        })(pos0, result0);
      }
      if (result0 === null) {
        pos = pos0;
      }
      if (result0 === null) {
        pos0 = pos;
        result0 = parse_stringNum();
        if (result0 !== null) {
          result0 = (function(offset, ts) {
            return createTimeSignature(parseFloat((defaultTime || defaultMeter) * eval(ts)))
          })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          if (input.charCodeAt(pos) === 47) {
            result0 = "/";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"/\"");
            }
          }
          if (result0 !== null) {
            result0 = (function(offset, ts) {
              var result = parseInt((defaultTime || defaultMeter) / 2);
              return createTimeSignature(result);
            })(pos0, result0);
          }
          if (result0 === null) {
            pos = pos0;
          }
        }
      }
    }
    return result0;
  }

  function parse_stringNum() {
    var result0, result1;
    var pos0;

    pos0 = pos;
    if (/^[0-9]/.test(input.charAt(pos))) {
      result1 = input.charAt(pos);
      pos++;
    } else {
      result1 = null;
      if (reportFailures === 0) {
        matchFailed("[0-9]");
      }
    }
    if (result1 !== null) {
      result0 = [];
      while (result1 !== null) {
        result0.push(result1);
        if (/^[0-9]/.test(input.charAt(pos))) {
          result1 = input.charAt(pos);
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[0-9]");
          }
        }
      }
    } else {
      result0 = null;
    }
    if (result0 !== null) {
      result0 = (function(offset, digits) {
        return digits.join("");
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_integer() {
    var result0;
    var pos0;

    reportFailures++;
    pos0 = pos;
    result0 = parse_stringNum();
    if (result0 !== null) {
      result0 = (function(offset, digits) {
        return parseInt(digits, 10);
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    reportFailures--;
    if (reportFailures === 0 && result0 === null) {
      matchFailed("integer");
    }
    return result0;
  }

  function parse_string() {
    var result0, result1;
    var pos0;

    pos0 = pos;
    if (/^[A-Za-z0-9,\/'"#&.=()\-[\]: ]/.test(input.charAt(pos))) {
      result1 = input.charAt(pos);
      pos++;
    } else {
      result1 = null;
      if (reportFailures === 0) {
        matchFailed("[A-Za-z0-9,\\/'\"#&.=()\\-[\\]: ]");
      }
    }
    if (result1 !== null) {
      result0 = [];
      while (result1 !== null) {
        result0.push(result1);
        if (/^[A-Za-z0-9,\/'"#&.=()\-[\]: ]/.test(input.charAt(pos))) {
          result1 = input.charAt(pos);
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[A-Za-z0-9,\\/'\"#&.=()\\-[\\]: ]");
          }
        }
      }
    } else {
      result0 = null;
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        return chars.join ? chars.join("") : chars;
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_string_no_quotes() {
    var result0, result1;
    var pos0;

    pos0 = pos;
    if (/^[A-Za-z0-9,\/#&.=()\-[\]: ]/.test(input.charAt(pos))) {
      result1 = input.charAt(pos);
      pos++;
    } else {
      result1 = null;
      if (reportFailures === 0) {
        matchFailed("[A-Za-z0-9,\\/#&.=()\\-[\\]: ]");
      }
    }
    if (result1 !== null) {
      result0 = [];
      while (result1 !== null) {
        result0.push(result1);
        if (/^[A-Za-z0-9,\/#&.=()\-[\]: ]/.test(input.charAt(pos))) {
          result1 = input.charAt(pos);
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[A-Za-z0-9,\\/#&.=()\\-[\\]: ]");
          }
        }
      }
    } else {
      result0 = null;
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        return chars.join ? chars.join("") : chars;
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse_alpha() {
    var result0;
    var pos0;

    pos0 = pos;
    if (/^[a-zA-Z]/.test(input.charAt(pos))) {
      result0 = input.charAt(pos);
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("[a-zA-Z]");
      }
    }
    if (result0 !== null) {
      result0 = (function(offset, chars) {
        if (chars.join)
          return chars.join("")
        else
          return chars
      })(pos0, result0);
    }
    if (result0 === null) {
      pos = pos0;
    }
    return result0;
  }

  function parse__() {
    var result0, result1;

    result0 = [];
    result1 = parse_whitespace();
    if (result1 === null) {
      result1 = parse_comment();
    }
    while (result1 !== null) {
      result0.push(result1);
      result1 = parse_whitespace();
      if (result1 === null) {
        result1 = parse_comment();
      }
    }
    return result0;
  }

  function parse_whitespace() {
    var result0;

    if (/^[\t\x0B\f \xA0\uFEFF]/.test(input.charAt(pos))) {
      result0 = input.charAt(pos);
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("[\\t\\x0B\\f \\xA0\\uFEFF]");
      }
    }
    if (result0 === null) {
      result0 = parse_Zs();
      if (result0 === null) {
        result0 = parse_nl();
      }
    }
    return result0;
  }

  function parse_LineTerminator() {
    var result0;

    if (/^[\n\r\u2028\u2029]/.test(input.charAt(pos))) {
      result0 = input.charAt(pos);
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("[\\n\\r\\u2028\\u2029]");
      }
    }
    return result0;
  }

  function parse_nl() {
    var result0;

    if (input.charCodeAt(pos) === 10) {
      result0 = "\n";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"\\n\"");
      }
    }
    if (result0 === null) {
      if (input.substr(pos, 2) === "\r\n") {
        result0 = "\r\n";
        pos += 2;
      } else {
        result0 = null;
        if (reportFailures === 0) {
          matchFailed("\"\\r\\n\"");
        }
      }
      if (result0 === null) {
        if (input.charCodeAt(pos) === 13) {
          result0 = "\r";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\r\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 8232) {
            result0 = "\u2028";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\u2028\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos) === 8233) {
              result0 = "\u2029";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\u2029\"");
              }
            }
          }
        }
      }
    }
    return result0;
  }

  function parse_comment() {
    var result0, result1, result2, result3;
    var pos0, pos1, pos2;

    pos0 = pos;
    if (input.charCodeAt(pos) === 37) {
      result0 = "%";
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("\"%\"");
      }
    }
    if (result0 !== null) {
      result1 = [];
      pos1 = pos;
      pos2 = pos;
      reportFailures++;
      result2 = parse_nl();
      reportFailures--;
      if (result2 === null) {
        result2 = "";
      } else {
        result2 = null;
        pos = pos2;
      }
      if (result2 !== null) {
        if (input.length > pos) {
          result3 = input.charAt(pos);
          pos++;
        } else {
          result3 = null;
          if (reportFailures === 0) {
            matchFailed("any character");
          }
        }
        if (result3 !== null) {
          result2 = [result2, result3];
        } else {
          result2 = null;
          pos = pos1;
        }
      } else {
        result2 = null;
        pos = pos1;
      }
      while (result2 !== null) {
        result1.push(result2);
        pos1 = pos;
        pos2 = pos;
        reportFailures++;
        result2 = parse_nl();
        reportFailures--;
        if (result2 === null) {
          result2 = "";
        } else {
          result2 = null;
          pos = pos2;
        }
        if (result2 !== null) {
          if (input.length > pos) {
            result3 = input.charAt(pos);
            pos++;
          } else {
            result3 = null;
            if (reportFailures === 0) {
              matchFailed("any character");
            }
          }
          if (result3 !== null) {
            result2 = [result2, result3];
          } else {
            result2 = null;
            pos = pos1;
          }
        } else {
          result2 = null;
          pos = pos1;
        }
      }
      if (result1 !== null) {
        result0 = [result0, result1];
      } else {
        result0 = null;
        pos = pos0;
      }
    } else {
      result0 = null;
      pos = pos0;
    }
    return result0;
  }

  function parse_Zs() {
    var result0;

    if (/^[ \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000]/.test(input.charAt(pos))) {
      result0 = input.charAt(pos);
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("[ \\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000]");
      }
    }
    return result0;
  }

  function parse_EOF() {
    var result0;
    var pos0;

    pos0 = pos;
    reportFailures++;
    if (input.length > pos) {
      result0 = input.charAt(pos);
      pos++;
    } else {
      result0 = null;
      if (reportFailures === 0) {
        matchFailed("any character");
      }
    }
    reportFailures--;
    if (result0 === null) {
      result0 = "";
    } else {
      result0 = null;
      pos = pos0;
    }
    return result0;
  }


  function cleanupExpected(expected) {
    expected.sort();

    var lastExpected = null;
    var cleanExpected = [];
    for (var i = 0; i < expected.length; i++) {
      if (expected[i] !== lastExpected) {
        cleanExpected.push(expected[i]);
        lastExpected = expected[i];
      }
    }
    return cleanExpected;
  }

  function computeErrorPosition() {
    /*
     * The first idea was to use |String.split| to break the input up to the
     * error position along newlines and derive the line and column from
     * there. However IE's |split| implementation is so broken that it was
     * enough to prevent it.
     */

    var line = 1;
    var column = 1;
    var seenCR = false;

    for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
      var ch = input.charAt(i);
      if (ch === "\n") {
        if (!seenCR) {
          line++;
        }
        column = 1;
        seenCR = false;
      } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
        line++;
        column = 1;
        seenCR = true;
      } else {
        column++;
        seenCR = false;
      }
    }

    return {
      line: line,
      column: column
    };
  }


  var defaultTime = undefined;
  var defaultMeter = undefined;

  var WHOLE = 256,
    HALF = 128,
    QUARTER = 64,
    _4TH = 32,
    _16TH = 16,
    _32TH = 8,
    _64TH = 4,
    _128TH = 2;

  var durations = [_128TH, _64TH, _32TH, _16TH, _4TH, QUARTER, HALF, WHOLE];
  var isDotted = function(duration) {
    return durations.indexOf(duration) === -1;
  };

  var getDots = function(duration) {
    if (duration == 0 || !isDotted(duration))
      return 0;

    var baseNote = 0;
    var l = durations.length - 1;

    for (var i = l; i >= 0; i--) {
      if (duration > durations[i]) {
        baseNote = durations[i];
        break;
      }
    }

    if (baseNote == 0)
      throw new Error("Duration out of range")

    return {
      duration: baseNote,
      dots: 1 + getDots(duration - baseNote)
    }
  }

  var createTimeSignature = function(result) {
    if (isDotted(result)) {
      return getDots(result);
    } else {
      return {
        duration: result,
        dots: 0
      }
    }
  };


  var result = parseFunctions[startRule]();

  /*
   * The parser is now in one of the following three states:
   *
   * 1. The parser successfully parsed the whole input.
   *
   *    - |result !== null|
   *    - |pos === input.length|
   *    - |rightmostFailuresExpected| may or may not contain something
   *
   * 2. The parser successfully parsed only a part of the input.
   *
   *    - |result !== null|
   *    - |pos < input.length|
   *    - |rightmostFailuresExpected| may or may not contain something
   *
   * 3. The parser did not successfully parse any part of the input.
   *
   *   - |result === null|
   *   - |pos === 0|
   *   - |rightmostFailuresExpected| contains at least one failure
   *
   * All code following this comment (including called functions) must
   * handle these states.
   */
  if (result === null || pos !== input.length) {
    var offset = Math.max(pos, rightmostFailuresPos);
    var found = offset < input.length ? input.charAt(offset) : null;
    var errorPosition = computeErrorPosition();

    throw new this.SyntaxError(
      cleanupExpected(rightmostFailuresExpected),
      found,
      offset,
      errorPosition.line,
      errorPosition.column
    );
  }

  return result;
}
