---
title: plotting bands.1
sidebar_label: nonmag or SOC
---
# Band Structure Comparisons

This document provides a script to visualize the band structures for a range of Hubbard U values. This visualization is crucial for understanding the effects of electronic correlation in materials science and solid-state physics.

## Python Code

The following Python code uses the `numpy` and `matplotlib` libraries to generate the band structure plots for a set of U values.

```python
import numpy as np
import matplotlib.pyplot as plt

# Set the list of U values
u_values = [0, 1.8, 1.85, 1.9, 1.95, 2.0]
# Initialize the plot
fig, axes = plt.subplots(nrows=2, ncols=3, figsize=(18, 12))

# Set the x-axis tick positions and labels
xticks_pos = [0.00000, 0.36592, 0.73183, 1.24932, 1.77880, 2.14472, 2.51063, 3.02812]
xticks_label = [r'$\Gamma$', r'$\mathrm{X}$', r'$\mathrm{M}$', r'$\Gamma$', r'$\mathrm{Z}$', r'$\mathrm{R}$', r'$\mathrm{A}$', r'$\mathrm{Z}$']

# Iterate over each U value, read data, and plot
for i, u in enumerate(u_values):
    # Read the file
    filename = f'/local//u{u}/band/bands.1'
    band_raw = np.genfromtxt(filename)

    N_kpts = 240
    N_band = int(len(band_raw) / N_kpts)

    # Process data
    band = np.zeros((N_kpts, N_band))
    for n in range(0, N_band):
        band[:, n] = band_raw[n * N_kpts:(n + 1) * N_kpts, 1]

    kpts = np.linspace(0.00000, np.max(xticks_pos), N_kpts)

    ax = axes[i // 3, i % 3]  # Determine the subplot location
    ax.set_title(f'U={u} SOC[110]')

    ax.set_xlim(np.min(xticks_pos), np.max(xticks_pos))
    ax.set_ylim(-2, 2)

    # Draw vertical lines
    for q in range(len(xticks_pos)):
        ax.plot([xticks_pos[q], xticks_pos[q]], [-8, 8], linewidth=0.7, color='k')
    
    # Plot the bands
    for n in range(N_band):
        ax.plot(kpts, band[:, n], color='C0', linewidth=1.5)
    
    ax.set_xticks(xticks_pos)
    ax.set_xticklabels(xticks_label)
    ax.set_ylabel(r'$E_{n\mathbf{k}} - E_\mathrm{F}\ [\mathrm{eV}]$')

# Adjust layout
plt.tight_layout()
plt.savefig('bandstructure_comparisons.png', dpi=300)
plt.show()
