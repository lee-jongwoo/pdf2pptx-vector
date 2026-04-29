class Pdf2pptxVector < Formula
  desc "Convert PDF slide decks to PPTX using full-slide SVGs"
  homepage "https://github.com/lee-jongwoo/pdf2pptx-vector"
  url "https://registry.npmjs.org/pdf2pptx-vector/-/pdf2pptx-vector-0.1.0.tgz"
  sha256 "a92bc600b1876b1bc4ae51311aaf960c3c03ab2db13dd9e6c4949573dc12057a"
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
