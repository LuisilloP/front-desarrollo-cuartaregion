param(
  [string]$Root = (Get-Location).Path,
  [string]$BaselineRoot = "",
  [int]$BaselinePort = 4311,
  [int]$CurrentPort = 4312
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($BaselineRoot)) {
  throw "BaselineRoot is required."
}

$evidence = Join-Path $Root "docs/ui-evidence"
$beforeDir = Join-Path $evidence "before"
$afterDir = Join-Path $evidence "after"

New-Item -ItemType Directory -Force -Path $beforeDir | Out-Null
New-Item -ItemType Directory -Force -Path $afterDir | Out-Null
Remove-Item (Join-Path $beforeDir "*.png") -Force -ErrorAction SilentlyContinue
Remove-Item (Join-Path $afterDir "*.png") -Force -ErrorAction SilentlyContinue

$routes = @(
  @{ Key = "home"; Path = "/" },
  @{ Key = "desarrollo"; Path = "/desarrollo/" },
  @{ Key = "marketing"; Path = "/marketing-digital/" },
  @{ Key = "casos"; Path = "/casos/clinica-dental-mont-blanc/" },
  @{ Key = "blog"; Path = "/blog/" },
  @{ Key = "privacidad"; Path = "/privacidad/" }
)

$devices = @(
  @{ Key = "desktop"; Args = @("--viewport-size", "1440,2200") },
  @{ Key = "mobile"; Args = @("--viewport-size", "390,844") }
)

$baseArgs = @("playwright", "screenshot", "-b", "chromium", "--full-page", "--wait-for-timeout", "1400", "--color-scheme", "light")

$baselineProc = Start-Process -FilePath "npm.cmd" -ArgumentList @("run", "preview", "--", "--host", "127.0.0.1", "--port", $BaselinePort) -WorkingDirectory $BaselineRoot -PassThru
$currentProc = Start-Process -FilePath "npm.cmd" -ArgumentList @("run", "preview", "--", "--host", "127.0.0.1", "--port", $CurrentPort) -WorkingDirectory $Root -PassThru

try {
  Start-Sleep -Seconds 8

  foreach ($route in $routes) {
    foreach ($device in $devices) {
      $name = "{0}-{1}.png" -f $route.Key, $device.Key
      $beforeFile = Join-Path $beforeDir $name
      $afterFile = Join-Path $afterDir $name

      $beforeUrl = "http://127.0.0.1:{0}{1}" -f $BaselinePort, $route.Path
      $afterUrl = "http://127.0.0.1:{0}{1}" -f $CurrentPort, $route.Path

      & npx @baseArgs @($device.Args) $beforeUrl $beforeFile
      if ($LASTEXITCODE -ne 0) {
        throw "Playwright screenshot failed for baseline $name"
      }

      & npx @baseArgs @($device.Args) $afterUrl $afterFile
      if ($LASTEXITCODE -ne 0) {
        throw "Playwright screenshot failed for current $name"
      }

      Write-Output "captured $name"
    }
  }
}
finally {
  $listen = Get-NetTCPConnection -State Listen -LocalPort $BaselinePort, $CurrentPort -ErrorAction SilentlyContinue
  foreach ($item in $listen) {
    Stop-Process -Id $item.OwningProcess -Force -ErrorAction SilentlyContinue
  }

  if ($baselineProc -and !$baselineProc.HasExited) {
    Stop-Process -Id $baselineProc.Id -Force -ErrorAction SilentlyContinue
  }
  if ($currentProc -and !$currentProc.HasExited) {
    Stop-Process -Id $currentProc.Id -Force -ErrorAction SilentlyContinue
  }
}
