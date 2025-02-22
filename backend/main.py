# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from decouple import config
import google.generativeai as genai 

# Create the FastAPI app instance
app = FastAPI()

# Initialize Gemini
GOOGLE_API_KEY = config("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the model
model = genai.GenerativeModel('gemini-pro')

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:4174",
    "http://localhost:3000",
    "https://vikky-pidea-1.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the ChatMessage model
class ChatMessage(BaseModel):
    message: str

# Chat endpoint
@app.post("/chat")
async def chat_with_gemini(chat_message: ChatMessage):
    print(f"Received message: {chat_message.message}")  # Debug print
    try:
        # Generate response using Gemini
        response = model.generate_content(chat_message.message)
        return {"response": response.text}
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/")
async def hye():
    return {"message": "API is running"}
