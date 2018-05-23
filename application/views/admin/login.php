<!DOCTYPE html>
<html>
<head>
	<title>Avatar Maker</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/dist/css/app.css');?>">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/dist/css/jquery.dataTables.css');?>">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/dist/css/admin.css');?>">
</head>
<body>
	
	<div class="container mt-4">
		<div class="row">
			<div class="col-12 col-sm-6 offset-sm-3">
				<h1>Login</h1>

				<?=form_open('admin/user/login');?>
				<div class="form-row">
					
					<div class="form-group col-12">
						<label for="username">Email</label>
						<input type="text" name="email" id="email" class="form-control" />
					</div>

					<div class="form-group col-12">
						<label for="password">Password</label>
						<input type="password" name="password" id="password" class="form-control" />
					</div>

					<input type="submit" name="login" value="Login" class="btn btn-primary">

				</div>

				<?=form_close();?>
			</div>
		</div>
	</div>

	


	<script type="text/javascript" src="<?=base_url('public/dist/js/app.js');?>"></script>

</body>
</html>
