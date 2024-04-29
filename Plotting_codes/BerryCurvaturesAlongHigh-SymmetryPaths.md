# Visualizing Orbital Hall Conductivity Along High-Symmetry Paths

This script plots the Orbital Berry Curvatures along high-symmetry paths in the Brillouin zone for various doping levels of a material. By doing this, we can infer the impact of doping on the electronic structure and topological features.

## Python Code

Below is the complete Python code, including data loading, calculation of the Fermi function, and the plotting of the OHC:

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.gridspec import GridSpec
from matplotlib.cm import get_cmap

# Constants and initializations
N_kpts = 240
Ef_levels = [0, 0, 0, 0, 0, 0]  # Assuming Fermi levels are set to zero for visualization
doping_levels = [
    'RuO2-SOC001/interpol', '0.1Rh-SOC001', '0.2Rh-SOC001', 
    '0.3Rh-SOC001', '0.4Rh-SOC001', '0.5Rh-SOC001'
]
titles = ["w/o doping", "10% Rh", "20% Rh", "30% Rh", "40% Rh", "50% Rh"]
high_sym_pos = [0.0, 0.36592, 0.73183, 1.24932, 1.77880, 2.14472, 2.51063, 3.02812]
high_sym_tic = [r'$\Gamma$', r'$X$', r'$M$', r'$\Gamma$', r'$Z$', r'$R$', r'$A$', r'$Z$']
color_map = get_cmap('tab20c')  # Color map with enough discrete colors

# Initialize figure and gridspec
fig, axes = plt.subplots(nrows=1, ncols=len(doping_levels), figsize=(20, 4), sharex=True, sharey=True)

# Define the Fermi function
def Fermi(En, Ef, kT):
    return 1. / (1. + np.exp((En - Ef) / kT))

for i, doping_level in enumerate(doping_levels):
    band_path = f'/Home/PlotData/{doping_level}/out_kres/band.npy'
    curvature_path = f'/Home/PlotData/{doping_level}/out_kres/JyLz_inter_kres_band.npy'
    band = np.load(band_path) - Ef_levels[i]  # Adjust band energies relative to Fermi level
    curvature = np.load(curvature_path)

    # Setup for computing total curvature
    k_step = np.linspace(high_sym_pos[1], high_sym_pos[3], N_kpts)

    Om_xy_tot = np.zeros(N_kpts)  # Initialize the total curvature array

    for n in range(N_wann):
        for k in range(N_kpts):
            f_n = Fermi(band[n, k], 0.0, 0.025)  # Compute the Fermi factor
            Om_xy_tot[k] += np.sum(curvature[:, n, k]) * f_n  # Sum weighted curvature across all spins or orbitals

    # Plotting
    ax = axes[i]
    ax.plot(k_step, Om_xy_tot, color='red')
    ax.set_xticks([high_sym_pos[1], high_sym_pos[2], high_sym_pos[3]])
    ax.set_xticklabels(['X', 'M', 'Γ'], fontsize=20)
    ax.set_xlim(high_sym_pos[1], high_sym_pos[3])
    ax.set_ylim([-2, 2])
    ax.tick_params(axis='y', labelsize=20)
    if i == 0:
        ax.set_ylabel(r'$-\Omega_{n\mathbf{k}}^{L_z}$ ($\mathrm{\hbar\AA}^2$)',fontsize=20)

plt.tight_layout()
plt.savefig('K-path_OHC.png', dpi=300)
plt.show()
