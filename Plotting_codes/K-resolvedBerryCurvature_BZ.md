# Cubic Berry Phase Texture

The following script visualizes the Berry phase texture in the Brillouin zone of a cubic system by plotting the z-component of the Berry curvature, \(-\Omega_z(\mathbf{k})\), using data obtained from calculations with the inclusion of spin-orbit coupling.

## Python Script for Cubic Lattice

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import griddata
from matplotlib import rc

# Constants
a = 4.5433  # Lattice constant
k_factor = 2 * np.pi / a  # Conversion factor from reciprocal lattice units to 1/Angstrom

# Load and prepare data
Om_Lz_raw = np.load('/Home/PlotData/0.0Rh-SOC001/out_ksum/BZ_0/JyLz_inter_kres_fermi.npy')
Om_Lz = np.sum(Om_Lz_raw, axis=0).ravel()

# Prepare grid for interpolation
kpts = np.genfromtxt('/Home/PlotData/0.0Rh-SOC001/out_ksum/BZ_0/kpts', skip_header=1)
N_kpts = len(kpts)
kx_vals = kpts[:, 0] * k_factor
ky_vals = kpts[:, 1] * k_factor

N_interpol = 1000
kx_interpol = np.linspace(-k_factor/2, k_factor/2, N_interpol)
ky_interpol = np.linspace(-k_factor/2, k_factor/2, N_interpol)
KX, KY = np.meshgrid(kx_interpol, ky_interpol)

# Interpolation
Om_Lz_interpol = griddata((kx_vals, ky_vals), Om_Lz, (KX, KY), method='cubic')

# Define a custom vmin and vmax for the color range
vmin, vmax = -1.0, 1.0  # Adjusted for better color contrast

# Plot
fig, ax = plt.subplots(figsize=(10, 8))
contour = ax.contourf(KX, KY, Om_Lz_interpol, levels=100, cmap='viridis', vmin=vmin, vmax=vmax)
cb = plt.colorbar(contour, extend='both')
cb.set_label(r'$-\Omega_z(\mathbf{k})$ ($\mathrm{\AA}^2$)', fontsize=30)
cb.ax.tick_params(labelsize=30)

# Label high symmetry points
high_symmetry_points = {r'$\Gamma$': (0.0, 0.0), 'X': (0.5, 0.0), 'M': (0.5, 0.5)}
for label, (x, y) in high_symmetry_points.items():
    ax.plot(x * k_factor, y * k_factor, 'wo')
    ax.text(x * k_factor, y * k_factor, f' {label}', color='black', ha='center', va='center', fontsize=30)

ax.set_xlabel(r'$k_x\ [\pi/a]$', fontsize=30)
ax.set_ylabel(r'$k_y\ [\pi/a]$', fontsize=30)
ax.set_xticks([-k_factor/2, 0, k_factor/2])
ax.set_xticklabels([r'$-\frac{\pi}{a}$', '0', r'$\frac{\pi}{a}$'], fontsize=30)
ax.set_yticks([-k_factor/2, 0, k_factor/2])
ax.set_yticklabels([r'$-\frac{\pi}{a}$', '0', r'$\frac{\pi}{a}$'], fontsize=30)
ax.grid(True)

plt.tight_layout()
plt.savefig('berry_BZ_0.png', dpi=300)
plt.show()

```
# 2D Hexagonal Berry Phase Texture
In a separate part of the script, we visualize the Berry phase texture over a two-dimensional hexagonal Brillouin zone. The script interpolates the raw data over the zone and plots the z-component of the Berry curvature.
```python
import numpy as np
import matplotlib.pyplot as plt
#from matplotlib import rc
#rc('text', usetex=True)
from scipy.interpolate import griddata
kT4= -0.25*4
lw = 1.5
fs = 20

kpts = np.genfromtxt('/Home/PlotData/kpts', skip_header=1)
N_kpts = len(kpts)
fac = 4/np.sqrt(3)
b1 = fac*np.array([np.sqrt(3.)/2., -1./2.])
b2 = fac*np.array([np.sqrt(3.)/2.,  1./2.])

kx = np.zeros(N_kpts)
ky = np.zeros(N_kpts)

for i in range(0, N_kpts):
    kx[i] = kpts[i,0]*b1[0] + kpts[i,1]*b2[0]
    ky[i] = kpts[i,0]*b1[1] + kpts[i,1]*b2[1]

Om_Lz_raw = np.load('/Home/PlotData/RuO2-SOC001/interpol/out_kres/JyLz_inter_kres_fermi.npy')
Om_Lz = np.sum(Om_Lz_raw, axis=0) # Get total



kx_extended = np.zeros(N_kpts*3*3)
ky_extended = np.zeros(N_kpts*3*3)
Om_Lz_extended = np.zeros(N_kpts*3*3)


for m in range(0,3):
    for n in range(0,3):
        ind = 3*n+m
        kx_extended[ind*N_kpts:(ind+1)*N_kpts] = kx + (n-1)*b1[0]+(m-1)*b2[0]
        ky_extended[ind*N_kpts:(ind+1)*N_kpts] = ky + (n-1)*b1[1]+(m-1)*b2[1]
        Om_Lz_extended[ind*N_kpts:(ind+1)*N_kpts] = Om_Lz
        


# Interpolation
N_interpol = 1000
rx = fac*1.2*(1/np.sqrt(3))
ry = fac*1.2*0.5
kx_interpol = np.linspace(-rx,rx,N_interpol)
ky_interpol = np.linspace(-ry,ry,N_interpol)
KX, KY = np.meshgrid(kx_interpol, ky_interpol)
Om_Lz_interpol = griddata((kx_extended, ky_extended), Om_Lz_extended, (KX, KY), method='cubic')


K0 = fac*np.array([1/np.sqrt(3),0])
K1 = fac*np.array([1/(2*np.sqrt(3)),1/2])
K2 = fac*np.array([-1/(2*np.sqrt(3)),1/2])
K3 = -K0
K4 = -K1
K5 = -K2


fig = plt.figure()


fig.add_subplot(1,1,1, aspect='equal')
plt.plot([K0[0],K1[0]],[K0[1],K1[1]], color='w', linewidth=lw/2)
plt.plot([K1[0],K2[0]],[K1[1],K2[1]], color='w', linewidth=lw/2)
plt.plot([K2[0],K3[0]],[K2[1],K3[1]], color='w', linewidth=lw/2)
plt.plot([K3[0],K4[0]],[K3[1],K4[1]], color='w', linewidth=lw/2)
plt.plot([K4[0],K5[0]],[K4[1],K5[1]], color='w', linewidth=lw/2)
plt.plot([K5[0],K0[0]],[K5[1],K0[1]], color='w', linewidth=lw/2)
plt.imshow(Om_Lz_interpol, extent=[-rx, rx, -ry, ry],cmap='bwr',vmin=-1, vmax=1)


plt.xticks(fontsize=0.7*fs)
plt.yticks(fontsize=0.7*fs)
cb = plt.colorbar()
cb.set_label(r'$-\Omega_z(\mathbf{k})$ ($\mathrm{\AA}^2$)', fontsize=1.0*fs)
cb.ax.tick_params(labelsize=0.7*fs)
plt.xlabel(r'$k_x\ [\pi/a]$', fontsize=fs)
plt.ylabel(r'$k_y\ [\pi/a]$', fontsize=fs)
plt.xlim(-rx, rx)
plt.ylim(-ry,ry)



fig.set_size_inches([8,6])
plt.tight_layout()
plt.savefig('fig_texture_orbital.0.pdf')
#plt.show()
