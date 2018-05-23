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
				<h1>Create Library</h1>

				<div class="mt-4">
					<?=form_open('admin/library/create');?>
					<div class="form-group">
						<label class="form-label" for="name">Name</label>
						<input type="text" name="name" id="name" class="form-control">
					</div>

					<div class="form-group">
						<label class="form-label" for="description">Description</label>
						<textarea type="text" name="description" id="description" class="form-control"> </textarea>
					</div>

					<div class="form-group">
						<label class="form-label" for="image">Image</label>
						<textarea type="text" name="image" id="image" class="form-control"> </textarea>
					</div>

					<div class="form-group">
						<label class="form-label" for="gender">Gender</label>
						<select class="form-control" name="gender">
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>

					<div class="text-right">
						<input type="submit" name="create" class="btn btn-primary btn-lg">
					</div>
					<?=form_close();?>
				</div>

			</div>
		</div>

	</div>

</body>
</html>