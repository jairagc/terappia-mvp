"""
Script para probar el endpoint /sentiment del backend.

Librerías:
- requests: para enviar solicitudes HTTP.
- json: para formatear la respuesta.
"""

import requests
import json

# URL del endpoint (ajustar si usas puerto o dominio diferente)
url = "http://localhost:3001/sentiment"

# Datos de prueba (fixture)
payload = {
    "text": "Últimamente me siento con mucha ansiedad y sin ganas de salir de casa.",
    "patient_id": "paciente001"
}

# Enviamos la solicitud POST
response = requests.post(url, json=payload)

# Mostramos resultados
print("Código de estado:", response.status_code)
print("Respuesta:")
print(json.dumps(response.json(), indent=2, ensure_ascii=False))
