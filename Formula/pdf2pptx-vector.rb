class Pdf2pptxVector < Formula
  desc "Convert PDF slide decks to PPTX using full-slide SVGs"
  homepage "https://github.com/OWNER/pdf2pptx-vector"
  url "https://registry.npmjs.org/pdf2pptx-vector/-/pdf2pptx-vector-0.1.0.tgz"
  sha256 "REPLACE_WITH_RELEASE_TARBALL_SHA256"
  license "MIT"

  depends_on "node"
  depends_on "pdf2svg"
  depends_on "poppler"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink libexec.glob("bin/*")
  end

  test do
    output = shell_output("#{bin}/pdf2pptx doctor")
    assert_match "OK pdf2svg:", output
    assert_match "OK pdfinfo:", output
  end
end
