<div class="global-overlay"></div>
<header>
	<div class="container-fluid">
		<div class="global-header <?=$this->uri->segment(1) === 'customize' ? 'is-hidden' : ''; ?>">
			<div class="global-header__nav">
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div class="global-header__logo">
				<a href="<?=base_url('home');?>"><img src="<?=base_url('public/images/logos/avatar-logo.png');?>"></a>
			</div>
			<div class="global-header__search">
				<a href="#"><img src="<?=base_url('public/images/icons/search.png');?>"></a>
				<div class="search">
                    <div class="search--container">
                        <div class="text-right mr-3">
                            <a href="#" class="btn-close"> > </a>
                        </div>
                        <?=form_open('search', array('class' => 'form-container'));?>
                            <div class="form-section">
                                <input type="text" name="search" class="form-control" placeholder="Search">
                            </div>
                        <?=form_close();?>
                    </div>
                </div>
			</div>
			<div class="global-header__lists">
				<ul>
					<li class="<?=$this->uri->segment(1) == 'home' ? 'is-active' : ''; ?>"><a href="<?=base_url('home');?>">Avatars</a></li>
					<li class="<?=$this->uri->segment(1) == 'avatars' ? 'is-active' : ''; ?>">
						<a href="<?=base_url('avatars');?>" class="<?=$this->session->has_userdata('username') ? '' : 'is-disabled--link';?>">My Avatars</a>
					</li>
					<li class="signin">
						<!-- <form action="" method="post" class="m-0"> -->
						<?=form_open('user/login'); ?>
							<?php if($this->session->has_userdata("username")) { ?>
								<a href="user/logout">Sign out</a>
							<?php } else { ?>
                            	<a href="#" class="btn-signin">Sign In</a>
							<?php } ?>
                            <div class="signin--container form-container">
                                <div class="text-left">
                                    <a href="#" class="btn-close"> < </a>
                                </div>
                                <div class="form-section">
                                    <label>Email</label>
                                    <input type="text" name="email" class="form-control" placeholder="username">
                                </div>
                                <div class="form-section">
                                    <label>Password</label>
                                    <input type="password" name="password" class="form-control" placeholder="email password">
                                </div>
                                <div class="form-section text-center">
                                    <input type="submit" class="btn btn--standard btn-save" name="btn-login" value="Sign In">
                                </div>
                            </div>
                        <?=form_close();?>
                        <!-- </form> -->
					</li>
					<li class="search">
                        <?=form_open('search');?>
                            <input type="text" name="search" class="txt-search">
                        <?=form_close();?>
                    </li>
					<?php if ($this->session->has_userdata("username")) { ?>
					<li class="user">
						<a href="#">Hi, <span class="text-capitalize"><?=$this->session->userdata('name');?></span></a>
					</li>
					<?php } ?>
					
				</ul>			
			</div>

		</div>

		<?php if ($this->uri->segment(1) === "customize") { ?>
		<div class="global-header__floating-action is-visible">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <?php } ?>




	</div>
	


</header>