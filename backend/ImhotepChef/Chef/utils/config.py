import google.generativeai as genai
from decouple import config

class Gemini_Config:
    # Load API keys from environment variables
    API_KEYS = [
        config('GEMINI_API_KEY_1', default=''),
        config('GEMINI_API_KEY_2', default=''),
    ]
    
    # Filter out empty keys
    API_KEYS = [key for key in API_KEYS if key]
    
    # Current key index for rotation
    _current_key_index = 0
    
    @classmethod
    def get_model(cls):
        """Get a configured Gemini model with the current API key"""
        if not cls.API_KEYS:
            raise ValueError("No Gemini API keys configured")
        
        current_key = cls.API_KEYS[cls._current_key_index]
        genai.configure(api_key=current_key)
        
        generation_config = {
            "temperature": 0.7,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
        }
        
        safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        ]
        
        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            generation_config=generation_config,
            safety_settings=safety_settings
        )
        
        return model
