$argname = Out-String -InputObject $args[0]
$param1 =( Get-Culture ).TextInfo.ToTitleCase( $argname.ToLower() )

$refreshTypesCommand = "npm run refreshTypes" + $param1
$BuildCommand = "npm run build" + $param1
$dirchange = "cd " + $param1
$readManifest = "Get-Content -Path ControlManifest.Input.Xml"

Invoke-Expression $refreshTypesCommand
Invoke-Expression $BuildCommand
Invoke-Expression $dirchange
Invoke-Expression $dirchange

[xml]$xmlElm = Get-Content -Path ControlManifest.Input.Xml
$versionString = $xmlElm.manifest.control.version
$version = [version] $versionString 
Write-Host $version
$version = $version.Build+1
Write-Host $version
cd..
pac pcf version --patchversion $version

pac pcf push --publisher-prefix sp --force-import

cd..