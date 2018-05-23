<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Convertion of XML</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<style type="text/css">
		textarea {
			height: 200px !important;
		}

		textarea::-webkit-scrollbar-track
		{
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
			border-radius: 5px;
			background-color: #F5F5F5;
		}

		textarea::-webkit-scrollbar
		{
			width: 5px;
			background-color: #F5F5F5;
		}

		textarea::-webkit-scrollbar-thumb
		{
			border-radius: 5px;
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
			background-color: #555;
		}
		.pad-all { padding: 15px; }
	</style>

</head>
<body>


	<div class="container-fluid pad-all">
		<form>
			<div class="row">
				<div class="col-xs-12 col-sm-6">
					<div class="form-group">
						<label class="form-label">SVG HTML:</label>
						<!-- <input type="file" name="" class="svg-file"> -->
						<textarea class="svg-field form-control"></textarea>
					</div>

					<div class="form-group">
						<div class="content"></div>
					</div>

					
				</div>

				<div class="col-xs-12 col-sm-6">
					<div class="form-group">
						<label class="form-label">JSON:</label>
						<textarea class="json-field form-control"></textarea>
					</div>

					<div class="form-group">
						<label class="form-label">SVG BASE MALE:</label>
						<textarea class="male-field form-control"></textarea>
					</div>

					<div class="form-group">
						<label class="form-label">SVG BASE FEMALE:</label>
						<textarea class="female-field form-control"></textarea>
					</div>
				</div>

				<div class="col-xs-12 col-sm-6" >
					<!-- <div class="form-group">
						<label class="form-label">HTML RESULT: (Removed the display="none" used as Base)</label>
						<textarea class="html-field form-control"></textarea>
					</div> -->
				
					
					<div class="form-group" style="display: none;">
						<div class="male-content" >
							<svg></svg>
						</div>
						
					</div>
				
					<div class="form-group" style="display: none;">
						<div class="female-content" >
							<svg></svg>
						</div>
					</div>
				</div>

				<div class="col-xs-12 text-left">
					<input type="button" class="btn btn-primary btn-json" value="Json">
					<input type="button" class="btn btn-default btn-clear" value="Clear">
				</div>
			</div>


		</form>
	</div>


	<script src='<?=base_url("node_modules/jquery/dist/jquery.js");?>'></script>
	<script src='<?=base_url("public/dist/js/converter.js")?>'></script>
</body>
</html>