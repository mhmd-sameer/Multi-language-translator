from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import MBartForConditionalGeneration, MBart50Tokenizer

app = Flask(__name__)

# Enable CORS for the specific frontend
CORS(app, resources={r"/translate": {"origins": "http://localhost:5173"}})

# Load model and tokenizer
model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-one-to-many-mmt")
tokenizer = MBart50Tokenizer.from_pretrained("facebook/mbart-large-50-one-to-many-mmt")  # Using slow tokenizer

# Translation function
def translate_text(text, target_lang):
    # Tokenize the text
    inputs = tokenizer(text, return_tensors="pt", padding=True)
    
    # Set the target language using forced_bos_token_id
    target_lang_id = tokenizer.lang_code_to_id[target_lang]  # Get the language ID from the tokenizer
    translation_ids = model.generate(**inputs, forced_bos_token_id=target_lang_id)
    
    # Decode the translated text
    translation = tokenizer.decode(translation_ids[0], skip_special_tokens=True)
    return translation

@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    text = data.get("text")
    target_lang = data.get("targetLang")
    
    if not text or not target_lang:
        return jsonify({"error": "Missing text or targetLang parameter"}), 400
    
    # Perform translation
    translated_text = translate_text(text, target_lang)
    
    return jsonify({"translation": translated_text})

if __name__ == "__main__":
    app.run(debug=True)
