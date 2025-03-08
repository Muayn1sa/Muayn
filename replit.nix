{ pkgs }: {
  deps = [
    pkgs.nodejs-16_x
    pkgs.chromium
    pkgs.nodePackages.typescript-language-server
    pkgs.nodePackages.yarn
    pkgs.replitPackages.jest
  ];
  env = {
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = "true";
    CHROMIUM_PATH = "${pkgs.chromium}/bin/chromium";
  };
}