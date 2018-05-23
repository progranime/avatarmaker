<!DOCTYPE html>
<html>
<head>
	<title>Avatar Maker</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/dist/css/app.css');?>">
</head>
<body>


	<?php $this->load->view('components/header'); ?>
	
	<!-- avatar-maker-position -->
	<div class="">

		<div class="avatar-position_container">
			<h1 class="text-center mt-3">Choose Position</h1>
			<?php $this->load->view('templates/avatar-position-lists.html'); ?>
		</div>

		<div class="avatar-maker_container d-none">
			<div class="avatar-maker">
				<div class="hb-wrapper">
					<div class="row">
						

						<div class="col-12 col-sm-6 border-left-sm order-sm-last">
							<!-- Svg Output -->
							<div class="avatar-maker_output" id="svgOutput">
								
							</div>
						</div>

						<div class="col-12 col-sm-6">
							
							<!-- Template for creating / customizing the avatar -->
							<?php $this->load->view('templates/avatar-customization.html'); ?>
							
						</div>

					</div>
				</div>

				<div class="text-center p-3">
					<a href="#" class="btn btn--standard btn-back mr-2">Back</a>
					<a href="#" class="btn btn--standard btn-finish" data-toggle="modal" data-target="#terminal-modal">Finish</a>
				</div>
			</div>
		</div>

	</div>
	
	<?php $this->load->view('components/terminal-modal'); ?>

	<script type="text/javascript" src="<?=base_url('public/dist/js/app.js');?>"></script>

</body>
</html>