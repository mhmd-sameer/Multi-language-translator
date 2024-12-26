import React, { useState } from "react";
import './App.css'

const App = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("hi_IN");
  const [translation, setTranslation] = useState("");

  const translateText = async () => {
    try {
      const response = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, targetLang: language }),
      });
      const data = await response.json();
      setTranslation(data.translation);
    } catch (error) {
      console.error("Error during translation:", error);
    }
  };
  console.log("Input text:", text);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Multi Language Translator</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
        style={{ width: "100%", height: "100px" }}
      />
      <br />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ margin: "10px" }}
      >
        <option value="ar_AR">Arabic</option>
  <option value="cs_CZ">Czech</option>
  <option value="de_DE">German</option>
  <option value="en_XX">English</option>
  <option value="es_XX">Spanish</option>
  <option value="et_EE">Estonian</option>
  <option value="fi_FI">Finnish</option>
  <option value="fr_XX">French</option>
  <option value="gu_IN">Gujarati</option>
  <option value="hi_IN">Hindi</option>
  <option value="it_IT">Italian</option>
  <option value="ja_XX">Japanese</option>
  <option value="kk_KZ">Kazakh</option>
  <option value="ko_KR">Korean</option>
  <option value="lt_LT">Lithuanian</option>
  <option value="lv_LV">Latvian</option>
  <option value="my_MM">Burmese</option>
  <option value="ne_NP">Nepali</option>
  <option value="nl_XX">Dutch</option>
  <option value="ro_RO">Romanian</option>
  <option value="ru_RU">Russian</option>
  <option value="si_LK">Sinhala</option>
  <option value="tr_TR">Turkish</option>
  <option value="vi_VN">Vietnamese</option>
  <option value="zh_CN">Chinese</option>
  <option value="af_ZA">Afrikaans</option>
  <option value="az_AZ">Azerbaijani</option>
  <option value="bn_IN">Bengali</option>
  <option value="fa_IR">Persian</option>
  <option value="he_IL">Hebrew</option>
  <option value="hr_HR">Croatian</option>
  <option value="id_ID">Indonesian</option>
  <option value="ka_GE">Georgian</option>
  <option value="km_KH">Khmer</option>
  <option value="mk_MK">Macedonian</option>
  <option value="ml_IN">Malayalam</option>
  <option value="mn_MN">Mongolian</option>
  <option value="mr_IN">Marathi</option>
  <option value="pl_PL">Polish</option>
  <option value="ps_AF">Pashto</option>
  <option value="pt_XX">Portuguese</option>
  <option value="sv_SE">Swedish</option>
  <option value="sw_KE">Swahili</option>
  <option value="ta_IN">Tamil</option>
  <option value="te_IN">Telugu</option>
  <option value="th_TH">Thai</option>
  <option value="tl_XX">Tagalog</option>
  <option value="uk_UA">Ukrainian</option>
  <option value="ur_PK">Urdu</option>
  <option value="xh_ZA">Xhosa</option>
  <option value="gl_ES">Galician</option>
  <option value="sl_SI">Slovene</option>
      </select>
      <br />
      <button onClick={translateText}>Translate</button>
      <h3>Translation:</h3>
      <p>{translation}</p>
    </div>
  );
};

export default App;
