tests:
  - name: "GET / - Hello message"
    method: "GET"
    path: "/"
    expected_status: 200
    expected_content_type: "text/plain"
    expected_body: "Hi there, Kirsten"

  - name: "GET /health - Health check"
    method: "GET"
    path: "/health"
    expected_status: 200
    expected_content_type: "text/plain"
    expected_body: "how are you?"

  - name: "GET /ready - Ready status with timestamp"
    method: "GET"
    path: "/ready"
    expected_status: 200
    expected_content_type: "application/json"
    json_fields:
      - "status": "ready"
      - "time": "ISO8601 timestamp"  # Prüft nur, ob ein gültiger ISO-Zeitstempel vorhanden ist

  - name: "GET /greet?name=Alice - Greeting with name param"
    method: "GET"
    path: "/greet"
    query:
      name: "Alice"
    expected_status: 200
    expected_content_type: "text/plain"
    expected_body: "Hello, Alice!"

  - name: "GET /greet without name - Error"
    method: "GET"
    path: "/greet"
    query:
      # Kein name-Parameter
    expected_status: 400
    expected_content_type: "text/plain"
    expected_body: "Name query parameter is required"

  - name: "Unknown route - 404"
    method: "GET"
    path: "/unknown"
    expected_status: 404
    expected_body: "Not Found"