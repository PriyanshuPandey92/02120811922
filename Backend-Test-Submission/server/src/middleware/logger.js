const LOG_API_URL="http://20.244.56.144/evaluation-service/logs";

export async function Log(stack, level, logPackage, message) {
  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: logPackage.toLowerCase(),
    message
  };

  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcml5YW5zaHVwYW5kZXk5MkBnbWFpbC5jb20iLCJleHAiOjE3NTE4NzMwNDgsImlhdCI6MTc1MTg3MjE0OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImE0ZDc2NjVmLTdiODUtNGYzZS1iMDdkLTY1ZjViYjQwYWIxNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InByaXlhbnNodSBwYW5kZXkiLCJzdWIiOiI2YmNjODQ1MC02NjY4LTQ3ZGUtYWVlYS02MjY2YTY0OWNiN2IifSwiZW1haWwiOiJwcml5YW5zaHVwYW5kZXk5MkBnbWFpbC5jb20iLCJuYW1lIjoicHJpeWFuc2h1IHBhbmRleSIsInJvbGxObyI6IjAyMTIwODExOTIyIiwiYWNjZXNzQ29kZSI6InpDUnZ1TiIsImNsaWVudElEIjoiNmJjYzg0NTAtNjY2OC00N2RlLWFlZWEtNjI2NmE2NDljYjdiIiwiY2xpZW50U2VjcmV0IjoieENUWFNiemphaEZNZ1FxeCJ9.k0z-cuU-jPivny8n8ovmingH4kl00Gldr-VRV6tTX_I`
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Logging failed with status ${response.status}`);
    } else {
      const data = await response.json();
      console.log(`Log successful: ${data.message}, ID: ${data.logID}`);
    }
  } catch (error) {
    console.error("Log request error:", error);
  }
}


