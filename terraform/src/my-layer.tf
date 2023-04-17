locals {
  lambda_common_libs_layer_zip_name = "artifacts/my-layer.zip"
  lambda_layer_name = "my-layer"
}

resource "aws_lambda_layer_version" "my-layer-version" {
  layer_name = "${local.lambda_layer_name}"
  filename = "${local.lambda_common_libs_layer_zip_name}"
  source_code_hash = filebase64sha256("${local.lambda_common_libs_layer_zip_name}")
  compatible_runtimes = ["nodejs14.x"]
}
