import React from 'react';
import MyNavbar from '../../components/MyNavbar';
import "./EditProfile.css"

function EditProfile () {
    return(
        <div className=' bg bg-light'>
            <MyNavbar/>
            <div className='edit-profile row'>
                <div className='section1 col-4'>
                    <div className="edit-profile-menu d-flex flex-column align-items-center">
                        <div>Edit Profile</div>
                        <div>Ubah Kata Sandi</div>
                        <div>Aplikasi dan situs web</div>
                        <div>Notifikasi email</div>
                        <div>Notifikasi otomatis</div>
                        <div>Kelola Kontak</div>
                        <div>Privasi dan Keamanan</div>
                        <div>Aktivitas login</div>
                        <div>Email dari Instagram</div>
                        <div>Bantuan</div>
                        <div>Koleksi digital</div>
                        <div>Beralih ke Akun Profesional</div>
                    </div>
                </div>
                <div className='section2 col d-flex flex-column'>
                    <div className='section2-edit-fotoProfile d-flex my-2'>
                        <div className='section2-edit-image'>
                            <img src="http://asset-a.grid.id/crop/0x0:0x0/780x800/photo/bobofoto/original/17235_jenis-jenis-hutan-berdasarkan-bentang-alamnya.jpg" alt="" />
                        </div>
                        <div>
                            <div className='section2-edit-fotoProfile-name'>rofi_mmhd</div>
                            <div className='section2-edit-fotoProfile-ubah'>Ubah Foto Profile</div>
                        </div>
                    </div>
                    <div className='section2-edit-nama d-flex my-2'>
                        <label htmlFor="name">Nama</label>
                        <input type="text" className='form-control me-2' />
                    </div>
                    <div className='section2-edit-username d-flex my-2'>
                        <label htmlFor="username">UserName</label>
                        <input type="text" className='form-control me-2' />
                    </div>
                    <div className='section2-edit-bio d-flex my-2'>
                        <label htmlFor="Bio">Bio</label>
                        <input type="text" className='form-control me-2' />
                    </div>
                    <button className='btn btn-primary mt-3'>Kirim</button>
                </div>
            </div>
        </div>
    )
}

export default EditProfile