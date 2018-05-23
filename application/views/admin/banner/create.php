<!DOCTYPE html>
<html>
<head>
	<title>Avatar Maker</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/dist/css/app.css');?>">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/dist/css/admin.css');?>">
</head>
<body>

	<?php $this->load->view('admin/components/header'); ?>

	<div class="container mt-4">
		<div class="row">
			<div class="col-12 col-sm-6 offset-sm-3">
				<h1>Create Banner</h1>
				
				<?=form_open('admin/banner/create', array("enctype" => "multipart/form-data"));?>
					<div class="form-row">
						<div class="form-group col-12">
							<label for="name">Name</label>
							<input type="text" name="name" id="name" class="form-control" />
						</div>

						<div class="form-group col-12">
							<label for="banner_mobile">Banner Mobile</label>
							<input type="file" class="form-control" name="banner[]" id="banner_mobile">
						</div>

						<div class="form-group col-12">
							<label for="banner_tablet">Banner Tablet</label>
							<input type="file" class="form-control" name="banner[]" id="banner_tablet">
						</div>

						<div class="form-group col-12">
							<label for="banner_desktop">Banner Desktop</label>
							<input type="file" class="form-control" name="banner[]" id="banner_desktop">
						</div>

						<div class="form-group col-12">
							<label for="visibility">Visibility</label>
							<select name="visibility" id="visibility" class="form-control">
								<option value="1">show</option>
								<option value="0">hidden</option>
							</select>
						</div>

						<div class="form-group col-12">
							<label for="sort">Sort</label>
							<input type="number" name="sort" id="sort" class="form-control">
						</div>

						<input type="submit" name="submit" class="btn btn-primary" value="Add Banner">
					</div>
				<?=form_close();?>
			</div>
		</div>
	</div>
	



</body>
</html>