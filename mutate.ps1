$envFile = Get-Content -Path ".env.local"
$envVars = @{}
foreach ($line in $envFile) {
    if ($line -match "^([^=]+)=(.*)$") {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        if ($value -match '^"(.*)"$') {
            $value = $matches[1]
        }
        $envVars[$key] = $value
    }
}

$projectId = $envVars["NEXT_PUBLIC_SANITY_PROJECT_ID"]
$dataset = $envVars["NEXT_PUBLIC_SANITY_DATASET"]
$token = $envVars["SANITY_API_TOKEN"]

$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $token"
}

$body = @"
{
  "mutations": [
    {
      "patch": {
        "id": "homePage",
        "set": {
          "slug": {
            "_type": "slug",
            "current": "home"
          }
        }
      }
    }
  ]
}
"@

$url = "https://$projectId.api.sanity.io/v2024-01-01/data/mutate/$dataset?returnIds=true"

try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
    $response | ConvertTo-Json -Depth 10 | Out-File -FilePath "ps-mutate-result.json"
    Write-Output "Mutation successful"
} catch {
    Write-Error "Mutation failed: $_"
}
