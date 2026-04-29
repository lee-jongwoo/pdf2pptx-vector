# Homebrew Distribution

This project is designed to be installed from a Homebrew tap using the formula in `Formula/pdf2pptx-vector.rb`.

## Release Flow

1. Update `package.json` metadata:

   - Replace `OWNER` in `homepage` and `bugs.url`.
   - Confirm the package name and version.

2. Verify the package:

   ```bash
   npm test
   npm pack --dry-run
   ```

3. Publish or upload a release artifact.

   The recommended Homebrew source is the npm package tarball:

   ```text
   https://registry.npmjs.org/pdf2pptx-vector/-/pdf2pptx-vector-0.1.0.tgz
   ```

4. Compute the tarball SHA:

   ```bash
   curl -L https://registry.npmjs.org/pdf2pptx-vector/-/pdf2pptx-vector-0.1.0.tgz | shasum -a 256
   ```

5. Edit `Formula/pdf2pptx-vector.rb`:

   - Replace the `url` if the release source differs.
   - Replace `REPLACE_WITH_RELEASE_TARBALL_SHA256`.
   - Replace homepage if needed.

6. Put the formula in a tap repository:

   ```text
   homebrew-pdf2pptx/Formula/pdf2pptx-vector.rb
   ```

7. Install from the tap:

   ```bash
   brew tap OWNER/pdf2pptx
   brew install pdf2pptx-vector
   pdf2pptx doctor
   ```

## Formula Dependencies

The formula declares:

- `node` for running the CLI.
- `pdf2svg` for PDF page to SVG conversion.
- `poppler` for `pdfinfo` page count and slide-size detection.
