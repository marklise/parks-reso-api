locals {
  tfc_hostname     = "app.terraform.io"
  tfc_organization = "bcgov"
  project          = "pil3ef"
  environment      = reverse(split("/", get_terragrunt_dir()))[0]
  aws_region       = get_env("AWS_REGION")
}

generate "common_vars" {
  path              = "common.auto.tfvars"
  if_exists         = "overwrite"
  disable_signature = true
  contents          = <<-EOF
aws_region = "${local.aws_region}"
EOF
}
