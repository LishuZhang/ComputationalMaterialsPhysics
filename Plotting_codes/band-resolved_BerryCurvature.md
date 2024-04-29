# Weighted Band Structures with Specific K-path

The following Python script is designed to visualize band structures for various doping levels of a material. It displays energy bands with an emphasis on the curvature by using the size of scatter plot points, where larger points indicate higher curvature values. This visualization helps to analyze the effects of doping on electronic properties.

## Python Code

Below is the Python code that sets up the parameters, loads the data, and creates the visualization:

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.cm import get_cmap

# Constants and initializations
N_kpts = 240
Ef_levels = [0, 0, 0, 0, 0, 0]  # Dummy Fermi levels for illustration
doping_levels = ['RuO2-SOC001/interpol', '0.1Rh-SOC001', '0.2Rh-SOC001', '0.3Rh-SOC001', '0.4Rh-SOC001', '0.5Rh-SOC001']
titles = ["w/o doping", "10% Rh", "20% Rh", "30% Rh", "40% Rh", "50% Rh"]
high_sym_pos = [0.0, 0.36592, 0.73183, 1.24932, 1.77880, 2.14472, 2.51063, 3.02812]
high_sym_tic = [r'$\Gamma$', r'$X$', r'$M$', r'$\Gamma$', r'$Z$', r'$R$', r'$A$', r'$Z$']
color_map = get_cmap('tab20')  # To provide unique colors for each band

# Initialize figure and gridspec
fig, axes = plt.subplots(nrows=1, ncols=len(doping_levels), figsize=(20, 4), sharey=True)
if len(doping_levels) == 1:
    axes = [axes]  # Ensure axes is always iterable

# Plotting loop for each doping level
for i, doping_level in enumerate(doping_levels):
    # Load data
    band_path = f'/Home/PlotData/{doping_level}/out_kres/band.npy'
    curvature_path = f'/Home/PlotData/{doping_level}/out_kres/JyLz_inter_kres_band.npy'
    bands = np.load(band_path)[:, k_start:k_end]
    curvature = np.load(curvature_path)[:, :, k_start:k_end]
    curvature_sum = np.sum(np.abs(curvature), axis=0)  # Summing over spins or atoms

    # Plot
    ax = axes[i]
    ax.set_title(titles[i])
    k_step = np.linspace(high_sym_pos[1], high_sym_pos[3], k_end - k_start)
    for band_idx in range(bands.shape[0]):
        ax.scatter(k_step, bands[band_idx] - Ef_levels[i], s=100 * curvature_sum[band_idx] / np.max(curvature_sum), c=[color_map(band_idx % 20)], alpha=0.9, label=f'Band {band_idx+1}' if i == 0 else "")
    ax.set_xlabel('Wave Vector k')
    if i == 0:
        ax.set_ylabel('Energy (eV)')
    ax.set_xticks([high_sym_pos[1], high_sym_pos[2], high_sym_pos[3]])
    ax.set_xticklabels(['X', 'M', 'Γ'])
    ax.set_xlim(high_sym_pos[1], high_sym_pos[3])
    ax.set_ylim([-2, 2])
    ax.axhline(y=0, color='black', linestyle='--', linewidth=0.5)

plt.tight_layout()
plt.show()
