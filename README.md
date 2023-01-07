# Winget-api

## Contents

- [Quick Start](#quick-start)

## <a name="quick-start"></a>Quick Start

### Getting started

To get your owner & product package name, please do the following:

- You will need the "company" and "product name" you are looking for. 
  - Github [winget-pkgs](https://github.com/microsoft/winget-pkgs/tree/master/manifests)
  - Command [window-install](https://learn.microsoft.com/windows/package-manager/winget/)

#### Once we have the company and package name, we send the Get method to that API address.
- **https://api.for-developer.link/winget/app/{company}/{packageName}**
    - EX) https://api.for-developer.link/winget/app/Google/Chrome
* Please note that it will take some time (2-3 seconds)
* For detailed information, we've made sure that only the most recently uploaded packages are imported.
* Get it as JSON type:
```
{
  "name": "Chrome",
  "owner": "Google",
  "versions": [
    "Dev/110.0.5481.24",
    "Canary/111.0.5522.0",
    "Beta",
    "108.0.5359.125",
    "105.0.5195.127"
  ],
  "last_package": {
    "version": "Dev/110.0.5481.24",
    "files": [
      "Google.Chrome.Dev.installer.yaml",
      "Google.Chrome.Dev.locale.en-US.yaml",
      "Google.Chrome.Dev.locale.nb-NO.yaml",
      "Google.Chrome.Dev.yaml"
    ],
    "Google.Chrome.Dev.installer.yaml": {
      "PackageIdentifier": "Google.Chrome.Dev",
      "PackageVersion": "110.0.5481.24",
      "MinimumOSVersion": "10.0.0.0",
      "InstallerType": "wix",
      "Scope": "machine",
      "UpgradeBehavior": "install",
      "ReleaseDate": "2023-01-05",
      "Architecture": "x86",
      "InstallerUrl": "https://dl.google.com/tag/s/dl/chrome/install/dev/googlechromedevstandaloneenterprise.msi",
      "InstallerSha256": "5EF44992EDDC7319A2A0F67043B931F790E7113872B70F47453CC66E020DBCA4",
      "ProductCode": "DE845B08-37BE-374B-8A36-86876E8B42E2",
      "ManifestType": "installer",
      "ManifestVersion": "1.2.0"
    },
    "Google.Chrome.Dev.locale.en-US.yaml": {
      "PackageIdentifier": "Google.Chrome.Dev",
      "PackageVersion": "110.0.5481.24",
      "PackageLocale": "en-US",
      "Publisher": "GoogleLLC",
      "PublisherUrl": "https://www.google.com",
      "PublisherSupportUrl": "https://support.google.com/hlen",
      "PrivacyUrl": "https://policies.google.com/privacyhlen&fg1",
      "Author": "GoogleLLC",
      "PackageName": "GoogleChromeDev",
      "PackageUrl": "https://www.google.com/chrome/dev/",
      "License": "Proprietaryfreeware,basedonopensourcecomponents",
      "LicenseUrl": "https://www.google.com/chrome/terms/",
      "Copyright": "©2022Google",
      "CopyrightUrl": "https://www.google.com/chrome/terms/",
      "ShortDescription": "GoogleChromefordevelopers",
      "Description": "Afast,secure,andfreewebbrowserbuiltforthemodernweb.Chromesyncsbookmarksacrossallyourdevices,fillsoutformsautomatically,andsomuchmore.",
      "Moniker": "chrome-dev",
      "ManifestType": "defaultLocale",
      "ManifestVersion": "1.2.0"
    },
    "Google.Chrome.Dev.locale.nb-NO.yaml": {
      "PackageIdentifier": "Google.Chrome.Dev",
      "PackageVersion": "110.0.5481.24",
      "PackageLocale": "nb-NO",
      "Publisher": "GoogleLLC",
      "PublisherUrl": "https://www.google.com",
      "PublisherSupportUrl": "https://support.google.com/hlno",
      "PrivacyUrl": "https://policies.google.com/privacyhlno&fg1",
      "Author": "GoogleLLC",
      "PackageName": "GoogleChromeDev",
      "PackageUrl": "https://www.google.com/intl/no/chrome/dev/",
      "License": "Proprietaryfreeware,basedonopensourcecomponents",
      "LicenseUrl": "https://www.google.com/intl/no/chrome/terms/",
      "Copyright": "©2021Google",
      "CopyrightUrl": "https://www.google.com/intl/no/chrome/terms/",
      "ShortDescription": "GoogleChromeforutviklere",
      "Description": "Enrask,sikkeroggratisnettleserbyggetfordetmodernenettet.Chromesynkronisererbokmerkerpalleenhetenedine,fyllerutskjemaerautomatiskogsmyemer.",
      "ManifestType": "locale",
      "ManifestVersion": "1.2.0"
    },
    "Google.Chrome.Dev.yaml": {
      "PackageIdentifier": "Google.Chrome.Dev",
      "PackageVersion": "110.0.5481.24",
      "DefaultLocale": "en-US",
      "ManifestType": "version",
      "ManifestVersion": "1.2.0"
    }
  }
}
```

### Precautions when using
- Sometimes, if you don't get results, try after a few minutes
- Because it is a personal project, the service can be stopped at any time in the event of a problem

### Questions
- Please register on the issue card
